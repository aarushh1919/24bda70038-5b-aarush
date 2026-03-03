const { body, validationResult } = require('express-validator');

// Validation rules
exports.validateStudent = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
    .isLength({ max: 50 }).withMessage('Name must not exceed 50 characters'),
  body('roll')
    .notEmpty().withMessage('Roll number is required')
    .isInt({ min: 1 }).withMessage('Roll number must be a positive integer'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone number must be exactly 10 digits'),
  body('address')
    .trim()
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 5 }).withMessage('Address must be at least 5 characters long')
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0].msg;
    const isEditPage = req.path.includes('/edit') || req.method === 'PUT';
    
    return res.status(400).render(isEditPage ? 'edit' : 'create', {
      title: isEditPage ? 'Edit Student' : 'Add New Student',
      student: req.body,
      message: errorMessage
    });
  }
  next();
};

// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).render('error', {
    message: message,
    error: err
  });
};

// 404 handler
exports.notFound = (req, res) => {
  res.status(404).render('error', {
    message: 'Page not found',
    error: {}
  });
};
