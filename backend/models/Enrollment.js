const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  simulationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Simulation',
    required: [true, 'Simulation ID is required']
  },
  status: {
    type: String,
    enum: ['enrolled', 'in-progress', 'completed', 'paused', 'dropped'],
    default: 'enrolled'
  },
  progress: {
    completedModules: [String],
    currentModule: String,
    percentageComplete: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    timeSpent: { // in minutes
      type: Number,
      default: 0
    },
    lastAccessed: Date
  },
  performance: {
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    assessments: [{
      moduleId: String,
      score: Number,
      maxScore: Number,
      completedAt: Date,
      timeSpent: Number
    }],
    strengths: [String],
    improvementAreas: [String]
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    wouldRecommend: Boolean,
    reviewDate: Date
  },
  certificates: [{
    type: String,
    issuedAt: Date,
    certificateId: String,
    downloadUrl: String
  }],
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  startedAt: Date,
  completedAt: Date,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure one enrollment per user per simulation
enrollmentSchema.index({ userId: 1, simulationId: 1 }, { unique: true });

// Update the updatedAt field before saving
enrollmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set startedAt when status changes to in-progress
  if (this.status === 'in-progress' && !this.startedAt) {
    this.startedAt = Date.now();
  }
  
  // Set completedAt when status changes to completed
  if (this.status === 'completed' && !this.completedAt) {
    this.completedAt = Date.now();
    this.progress.percentageComplete = 100;
  }
  
  next();
});

// Virtual for duration (time from start to completion)
enrollmentSchema.virtual('duration').get(function() {
  if (this.startedAt && this.completedAt) {
    return Math.ceil((this.completedAt - this.startedAt) / (1000 * 60 * 60 * 24)); // days
  }
  return null;
});

// Static method to find user enrollments
enrollmentSchema.statics.findUserEnrollments = function(userId, status = null) {
  const query = { userId };
  if (status) query.status = status;
  return this.find(query).populate('simulationId');
};

// Static method to find simulation enrollments
enrollmentSchema.statics.findSimulationEnrollments = function(simulationId, status = null) {
  const query = { simulationId };
  if (status) query.status = status;
  return this.find(query).populate('userId');
};

// Method to update progress
enrollmentSchema.methods.updateProgress = function(moduleId, isCompleted = true) {
  if (isCompleted && !this.progress.completedModules.includes(moduleId)) {
    this.progress.completedModules.push(moduleId);
  }
  
  // Update status based on progress
  if (this.status === 'enrolled' && this.progress.completedModules.length > 0) {
    this.status = 'in-progress';
  }
  
  return this.save();
};

// Index for better query performance
enrollmentSchema.index({ userId: 1 });
enrollmentSchema.index({ simulationId: 1 });
enrollmentSchema.index({ status: 1 });
enrollmentSchema.index({ enrolledAt: -1 });
enrollmentSchema.index({ completedAt: -1 });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
