const express = require('express');
const router = express.Router();
const { validateTask } = require('../middleware/validation');
const { validationResult } = require('express-validator');
const taskController = require('../controllers/taskController');

// Middleware to handle validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/tasks', validateTask, handleValidation, taskController.createTask);
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', validateTask, handleValidation, taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
