const express = require('express');
const Simulation = require('../models/Simulation');
const { asyncHandler } = require('../middleware/errorHandler');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all simulations with filtering and pagination
// @route   GET /api/simulations
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const {
    category,
    level,
    pricing,
    search,
    page = 1,
    limit = 12,
    sort = '-createdAt'
  } = req.query;

  // Build query
  const query = { isActive: true };

  if (category) query.category = category;
  if (level) query.level = level;
  if (pricing) query['pricing.type'] = pricing;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  // Calculate pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const simulations = await Simulation.find(query)
    .populate('createdBy', 'name')
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  // Get total count for pagination
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

// @desc    Get simulation by ID
// @route   GET /api/simulations/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id)
    .populate('createdBy', 'name profile.avatar');

  if (!simulation || !simulation.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Simulation not found'
    });
  }

  res.json({
    success: true,
    data: {
      simulation
    }
  });
}));

// @desc    Get simulations by category
// @route   GET /api/simulations/category/:category
// @access  Public
router.get('/category/:category', asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { limit = 10 } = req.query;

  const simulations = await Simulation.findByCategory(category)
    .populate('createdBy', 'name')
    .sort({ 'metrics.averageRating': -1 })
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: {
      category,
      simulations
    }
  });
}));

// @desc    Get featured simulations
// @route   GET /api/simulations/featured/list
// @access  Public
router.get('/featured/list', asyncHandler(async (req, res) => {
  const { limit = 6 } = req.query;

  // Get simulations with high ratings and enrollments
  const simulations = await Simulation.find({
    isActive: true,
    'metrics.averageRating': { $gte: 4.0 },
    'metrics.enrollments': { $gte: 10 }
  })
    .populate('createdBy', 'name')
    .sort({ 'metrics.averageRating': -1, 'metrics.enrollments': -1 })
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: {
      simulations
    }
  });
}));

// @desc    Get simulation statistics
// @route   GET /api/simulations/:id/stats
// @access  Private (enrolled users or admin)
router.get('/:id/stats', auth, asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);

  if (!simulation) {
    return res.status(404).json({
      success: false,
      message: 'Simulation not found'
    });
  }

  // Check if user is enrolled or is admin
  const Enrollment = require('../models/Enrollment');
  const enrollment = await Enrollment.findOne({
    userId: req.user._id,
    simulationId: req.params.id
  });

  if (!enrollment && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You must be enrolled in this simulation.'
    });
  }

  res.json({
    success: true,
    data: {
      stats: simulation.metrics,
      completionRate: simulation.completionRate
    }
  });
}));

// @desc    Search simulations
// @route   POST /api/simulations/search
// @access  Public
router.post('/search', asyncHandler(async (req, res) => {
  const {
    query: searchQuery,
    filters = {},
    sort = '-metrics.averageRating',
    page = 1,
    limit = 12
  } = req.body;

  // Build search query
  const mongoQuery = { isActive: true };

  if (searchQuery) {
    mongoQuery.$or = [
      { title: { $regex: searchQuery, $options: 'i' } },
      { description: { $regex: searchQuery, $options: 'i' } },
      { tags: { $in: [new RegExp(searchQuery, 'i')] } }
    ];
  }

  // Apply filters
  if (filters.category) mongoQuery.category = { $in: filters.category };
  if (filters.level) mongoQuery.level = { $in: filters.level };
  if (filters.pricing) mongoQuery['pricing.type'] = { $in: filters.pricing };
  if (filters.duration) {
    mongoQuery.duration = {
      $gte: filters.duration.min || 0,
      $lte: filters.duration.max || 100
    };
  }

  // Calculate pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Execute search
  const simulations = await Simulation.find(mongoQuery)
    .populate('createdBy', 'name')
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  const total = await Simulation.countDocuments(mongoQuery);

  res.json({
    success: true,
    data: {
      simulations,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum
      },
      searchQuery,
      filters
    }
  });
}));

module.exports = router;
