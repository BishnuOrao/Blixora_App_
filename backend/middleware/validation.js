const Joi = require('joi');

// User registration validation
const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
    role: Joi.string().valid('user', 'admin').default('user')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

// User login validation
const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

// Simulation creation validation
const validateSimulation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(1000).required(),
    category: Joi.string().valid(
      'ai-machine-learning',
      'cybersecurity',
      'cloud-computing',
      'web-development',
      'data-science',
      'devops',
      'blockchain',
      'mobile-development'
    ).required(),
    level: Joi.string().valid('beginner', 'intermediate', 'advanced').required(),
    duration: Joi.number().min(1).max(100).required(),
    content: Joi.object({
      modules: Joi.array().items(
        Joi.object({
          title: Joi.string().required(),
          description: Joi.string(),
          estimatedTime: Joi.number(),
          resources: Joi.array().items(Joi.string())
        })
      ),
      prerequisites: Joi.array().items(Joi.string()),
      learningObjectives: Joi.array().items(Joi.string()),
      tools: Joi.array().items(Joi.string())
    }),
    media: Joi.object({
      thumbnail: Joi.string().uri(),
      video: Joi.string().uri(),
      images: Joi.array().items(Joi.string().uri())
    }),
    pricing: Joi.object({
      type: Joi.string().valid('free', 'premium', 'pro').default('free'),
      price: Joi.number().min(0).default(0)
    }),
    tags: Joi.array().items(Joi.string())
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

// Enrollment validation
const validateEnrollment = (req, res, next) => {
  const schema = Joi.object({
    simulationId: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

// Progress update validation
const validateProgressUpdate = (req, res, next) => {
  const schema = Joi.object({
    moduleId: Joi.string().required(),
    isCompleted: Joi.boolean().default(true),
    timeSpent: Joi.number().min(0),
    score: Joi.number().min(0).max(100)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateSimulation,
  validateEnrollment,
  validateProgressUpdate
};
