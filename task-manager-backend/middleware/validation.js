const { body } = require('express-validator');

exports.validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('dueDate').isISO8601().toDate().withMessage('Valid due date required'),
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Invalid status'),
];
