const express = require('express');
const Enrollment = require('../models/Enrollment');
const Simulation = require('../models/Simulation');
const { asyncHandler } = require('../middleware/errorHandler');
const { auth } = require('../middleware/auth');
const { validateEnrollment, validateProgressUpdate } = require('../middleware/validation');

const router = express.Router();

// @desc    Enroll in a simulation
// @route   POST /api/enrollments
// @access  Private
router.post('/', auth, validateEnrollment, asyncHandler(async (req, res) => {
  const { simulationId } = req.body;
  const userId = req.user._id;

  // Check if simulation exists
  const simulation = await Simulation.findById(simulationId);
  if (!simulation || !simulation.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Simulation not found'
    });
  }

  // Check if already enrolled
  const existingEnrollment = await Enrollment.findOne({
    userId,
    simulationId
  });

  if (existingEnrollment) {
    return res.status(400).json({
      success: false,
      message: 'You are already enrolled in this simulation'
    });
  }

  // Create enrollment
  const enrollment = new Enrollment({
    userId,
    simulationId,
    status: 'enrolled'
  });

  await enrollment.save();

  // Update simulation enrollment count
  await Simulation.findByIdAndUpdate(simulationId, {
    $inc: { 'metrics.enrollments': 1 }
  });

  // Populate the enrollment with simulation details
  await enrollment.populate('simulationId', 'title description category level duration');

  res.status(201).json({
    success: true,
    message: 'Successfully enrolled in simulation',
    data: {
      enrollment
    }
  });
}));

// @desc    Get user's enrollments
// @route   GET /api/enrollments/my
// @access  Private
router.get('/my', auth, asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const userId = req.user._id;

  // Build query
  const query = { userId };
  if (status) query.status = status;

  // Calculate pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Get enrollments
  const enrollments = await Enrollment.find(query)
    .populate('simulationId', 'title description category level duration media pricing metrics')
    .sort('-enrolledAt')
    .skip(skip)
    .limit(limitNum);

  const total = await Enrollment.countDocuments(query);

  res.json({
    success: true,
    data: {
      enrollments,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum
      }
    }
  });
}));

// @desc    Get specific enrollment
// @route   GET /api/enrollments/:id
// @access  Private
router.get('/:id', auth, asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id)
    .populate('simulationId')
    .populate('userId', 'name email');

  if (!enrollment) {
    return res.status(404).json({
      success: false,
      message: 'Enrollment not found'
    });
  }

  // Check if user owns this enrollment or is admin
  if (enrollment.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  res.json({
    success: true,
    data: {
      enrollment
    }
  });
}));

// @desc    Update enrollment progress
// @route   PUT /api/enrollments/:id/progress
// @access  Private
router.put('/:id/progress', auth, validateProgressUpdate, asyncHandler(async (req, res) => {
  const { moduleId, isCompleted, timeSpent, score } = req.body;

  const enrollment = await Enrollment.findById(req.params.id);

  if (!enrollment) {
    return res.status(404).json({
      success: false,
      message: 'Enrollment not found'
    });
  }

  // Check if user owns this enrollment
  if (enrollment.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  // Update progress
  if (isCompleted && !enrollment.progress.completedModules.includes(moduleId)) {
    enrollment.progress.completedModules.push(moduleId);
  }

  if (timeSpent) {
    enrollment.progress.timeSpent += timeSpent;
  }

  enrollment.progress.lastAccessed = new Date();

  // Update status based on progress
  if (enrollment.status === 'enrolled' && enrollment.progress.completedModules.length > 0) {
    enrollment.status = 'in-progress';
  }

  // Add assessment if score provided
  if (score !== undefined) {
    enrollment.performance.assessments.push({
      moduleId,
      score,
      maxScore: 100,
      completedAt: new Date(),
      timeSpent: timeSpent || 0
    });

    // Update overall score (average of all assessments)
    const totalScore = enrollment.performance.assessments.reduce((sum, assessment) => sum + assessment.score, 0);
    enrollment.performance.score = Math.round(totalScore / enrollment.performance.assessments.length);
  }

  await enrollment.save();

  res.json({
    success: true,
    message: 'Progress updated successfully',
    data: {
      enrollment
    }
  });
}));

// @desc    Complete enrollment
// @route   PUT /api/enrollments/:id/complete
// @access  Private
router.put('/:id/complete', auth, asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);

  if (!enrollment) {
    return res.status(404).json({
      success: false,
      message: 'Enrollment not found'
    });
  }

  // Check if user owns this enrollment
  if (enrollment.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  // Update enrollment status
  enrollment.status = 'completed';
  enrollment.completedAt = new Date();
  enrollment.progress.percentageComplete = 100;

  await enrollment.save();

  // Update simulation completion count
  await Simulation.findByIdAndUpdate(enrollment.simulationId, {
    $inc: { 'metrics.completions': 1 }
  });

  // Update user stats
  await require('../models/User').findByIdAndUpdate(req.user._id, {
    $inc: { 'stats.simulationsCompleted': 1 }
  });

  res.json({
    success: true,
    message: 'Simulation completed successfully',
    data: {
      enrollment
    }
  });
}));

// @desc    Add feedback/review
// @route   PUT /api/enrollments/:id/feedback
// @access  Private
router.put('/:id/feedback', auth, asyncHandler(async (req, res) => {
  const { rating, review, wouldRecommend } = req.body;

  // Validation
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: 'Rating must be between 1 and 5'
    });
  }

  const enrollment = await Enrollment.findById(req.params.id);

  if (!enrollment) {
    return res.status(404).json({
      success: false,
      message: 'Enrollment not found'
    });
  }

  // Check if user owns this enrollment
  if (enrollment.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  // Check if simulation is completed
  if (enrollment.status !== 'completed') {
    return res.status(400).json({
      success: false,
      message: 'You can only review completed simulations'
    });
  }

  // Update feedback
  const hadPreviousReview = enrollment.feedback.rating !== undefined;
  
  enrollment.feedback = {
    rating,
    review,
    wouldRecommend,
    reviewDate: new Date()
  };

  await enrollment.save();

  // Update simulation rating
  const simulation = await Simulation.findById(enrollment.simulationId);
  const allEnrollments = await Enrollment.find({
    simulationId: enrollment.simulationId,
    'feedback.rating': { $exists: true }
  });

  const totalRating = allEnrollments.reduce((sum, enr) => sum + enr.feedback.rating, 0);
  const averageRating = totalRating / allEnrollments.length;

  await Simulation.findByIdAndUpdate(enrollment.simulationId, {
    'metrics.averageRating': Math.round(averageRating * 10) / 10,
    'metrics.totalReviews': allEnrollments.length
  });

  res.json({
    success: true,
    message: 'Feedback submitted successfully',
    data: {
      enrollment
    }
  });
}));

// @desc    Withdraw from simulation
// @route   DELETE /api/enrollments/:id
// @access  Private
router.delete('/:id', auth, asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);

  if (!enrollment) {
    return res.status(404).json({
      success: false,
      message: 'Enrollment not found'
    });
  }

  // Check if user owns this enrollment
  if (enrollment.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  // Can't withdraw from completed simulations
  if (enrollment.status === 'completed') {
    return res.status(400).json({
      success: false,
      message: 'Cannot withdraw from completed simulations'
    });
  }

  // Update status to dropped instead of deleting
  enrollment.status = 'dropped';
  await enrollment.save();

  // Update simulation enrollment count
  await Simulation.findByIdAndUpdate(enrollment.simulationId, {
    $inc: { 'metrics.enrollments': -1 }
  });

  res.json({
    success: true,
    message: 'Successfully withdrawn from simulation'
  });
}));

module.exports = router;
