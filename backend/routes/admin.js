const express = require('express');
const User = require('../models/User');
const Simulation = require('../models/Simulation');
const Enrollment = require('../models/Enrollment');
const { asyncHandler } = require('../middleware/errorHandler');
const { auth, isAdmin } = require('../middleware/auth');
const { validateSimulation } = require('../middleware/validation');

const router = express.Router();

// Apply auth and admin middleware to all routes
router.use(auth);
router.use(isAdmin);

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
router.get('/dashboard', asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalSimulations,
    totalEnrollments,
    completedEnrollments,
    recentUsers,
    recentEnrollments,
    topSimulations
  ] = await Promise.all([
    User.countDocuments({ isActive: true }),
    Simulation.countDocuments({ isActive: true }),
    Enrollment.countDocuments(),
    Enrollment.countDocuments({ status: 'completed' }),
    User.find({ isActive: true }).sort('-createdAt').limit(5).select('name email createdAt'),
    Enrollment.find().sort('-enrolledAt').limit(5).populate('userId', 'name email').populate('simulationId', 'title category'),
    Simulation.find({ isActive: true }).sort('-metrics.enrollments').limit(5).select('title metrics category')
  ]);

  const completionRate = totalEnrollments > 0 ? (completedEnrollments / totalEnrollments * 100).toFixed(1) : 0;

  res.json({
    success: true,
    data: {
      stats: {
        totalUsers,
        totalSimulations,
        totalEnrollments,
        completedEnrollments,
        completionRate: parseFloat(completionRate)
      },
      recentUsers,
      recentEnrollments,
      topSimulations
    }
  });
}));

// === USER MANAGEMENT ===

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
router.get('/users', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, role, status } = req.query;

  // Build query
  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }
  if (role) query.role = role;
  if (status === 'active') query.isActive = true;
  if (status === 'inactive') query.isActive = false;

  // Calculate pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const users = await User.find(query)
    .sort('-createdAt')
    .skip(skip)
    .limit(limitNum);

  const total = await User.countDocuments(query);

  res.json({
    success: true,
    data: {
      users,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum
      }
    }
  });
}));

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private (Admin only)
router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Get user's enrollments
  const enrollments = await Enrollment.find({ userId: req.params.id })
    .populate('simulationId', 'title category level')
    .sort('-enrolledAt');

  res.json({
    success: true,
    data: {
      user,
      enrollments
    }
  });
}));

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin only)
router.put('/users/:id', asyncHandler(async (req, res) => {
  const allowedUpdates = ['name', 'email', 'role', 'isActive', 'profile'];
  const updates = {};

  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    message: 'User updated successfully',
    data: { user }
  });
}));

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
router.delete('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Soft delete by deactivating
  user.isActive = false;
  await user.save();

  res.json({
    success: true,
    message: 'User deactivated successfully'
  });
}));

// === SIMULATION MANAGEMENT ===

// @desc    Create simulation
// @route   POST /api/admin/simulations
// @access  Private (Admin only)
router.post('/simulations', validateSimulation, asyncHandler(async (req, res) => {
  const simulationData = {
    ...req.body,
    createdBy: req.user._id
  };

  const simulation = new Simulation(simulationData);
  await simulation.save();

  res.status(201).json({
    success: true,
    message: 'Simulation created successfully',
    data: { simulation }
  });
}));

// @desc    Get all simulations (including inactive)
// @route   GET /api/admin/simulations
// @access  Private (Admin only)
router.get('/simulations', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, category, level, status } = req.query;

  // Build query
  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  if (category) query.category = category;
  if (level) query.level = level;
  if (status === 'active') query.isActive = true;
  if (status === 'inactive') query.isActive = false;

  // Calculate pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const simulations = await Simulation.find(query)
    .populate('createdBy', 'name email')
    .sort('-createdAt')
    .skip(skip)
    .limit(limitNum);

  const total = await Simulation.countDocuments(query);

  res.json({
    success: true,
    data: {
      simulations,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum
      }
    }
  });
}));

// @desc    Update simulation
// @route   PUT /api/admin/simulations/:id
// @access  Private (Admin only)
router.put('/simulations/:id', asyncHandler(async (req, res) => {
  const simulation = await Simulation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!simulation) {
    return res.status(404).json({
      success: false,
      message: 'Simulation not found'
    });
  }

  res.json({
    success: true,
    message: 'Simulation updated successfully',
    data: { simulation }
  });
}));

// @desc    Delete simulation
// @route   DELETE /api/admin/simulations/:id
// @access  Private (Admin only)
router.delete('/simulations/:id', asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);

  if (!simulation) {
    return res.status(404).json({
      success: false,
      message: 'Simulation not found'
    });
  }

  // Soft delete by deactivating
  simulation.isActive = false;
  await simulation.save();

  res.json({
    success: true,
    message: 'Simulation deactivated successfully'
  });
}));

// === ENROLLMENT MANAGEMENT ===

// @desc    Get all enrollments
// @route   GET /api/admin/enrollments
// @access  Private (Admin only)
router.get('/enrollments', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, simulationId, userId } = req.query;

  // Build query
  const query = {};
  if (status) query.status = status;
  if (simulationId) query.simulationId = simulationId;
  if (userId) query.userId = userId;

  // Calculate pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const enrollments = await Enrollment.find(query)
    .populate('userId', 'name email')
    .populate('simulationId', 'title category level')
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

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Private (Admin only)
router.get('/analytics', asyncHandler(async (req, res) => {
  const { period = '30' } = req.query; // days
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - parseInt(period));

  const [
    userGrowth,
    enrollmentTrends,
    categoryStats,
    completionRates
  ] = await Promise.all([
    User.aggregate([
      { $match: { createdAt: { $gte: daysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    Enrollment.aggregate([
      { $match: { enrolledAt: { $gte: daysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$enrolledAt" } },
          enrollments: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    Simulation.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalEnrollments: { $sum: "$metrics.enrollments" },
          avgRating: { $avg: "$metrics.averageRating" }
        }
      }
    ]),
    Enrollment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])
  ]);

  res.json({
    success: true,
    data: {
      userGrowth,
      enrollmentTrends,
      categoryStats,
      completionRates,
      period: parseInt(period)
    }
  });
}));

module.exports = router;
