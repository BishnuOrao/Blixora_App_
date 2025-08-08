const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'ai-machine-learning',
      'cybersecurity',
      'cloud-computing',
      'web-development',
      'data-science',
      'devops',
      'blockchain',
      'mobile-development'
    ]
  },
  level: {
    type: String,
    required: [true, 'Level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 hour'],
    max: [100, 'Duration cannot exceed 100 hours']
  },
  content: {
    modules: [{
      title: String,
      description: String,
      estimatedTime: Number, // in minutes
      resources: [String]
    }],
    prerequisites: [String],
    learningObjectives: [String],
    tools: [String]
  },
  media: {
    thumbnail: String,
    video: String,
    images: [String]
  },
  pricing: {
    type: {
      type: String,
      enum: ['free', 'premium', 'pro'],
      default: 'free'
    },
    price: {
      type: Number,
      default: 0
    }
  },
  metrics: {
    enrollments: { type: Number, default: 0 },
    completions: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 }
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
simulationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for completion rate
simulationSchema.virtual('completionRate').get(function() {
  if (this.metrics.enrollments === 0) return 0;
  return ((this.metrics.completions / this.metrics.enrollments) * 100).toFixed(1);
});

// Static method to find by category
simulationSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true });
};

// Static method to find by level
simulationSchema.statics.findByLevel = function(level) {
  return this.find({ level, isActive: true });
};

// Index for better query performance
simulationSchema.index({ category: 1 });
simulationSchema.index({ level: 1 });
simulationSchema.index({ 'pricing.type': 1 });
simulationSchema.index({ isActive: 1 });
simulationSchema.index({ createdAt: -1 });
simulationSchema.index({ 'metrics.averageRating': -1 });

const Simulation = mongoose.model('Simulation', simulationSchema);

module.exports = Simulation;
