const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateStudent, handleValidationErrors } = require('../middleware/validation');

// GET - Display all students
router.get('/', studentController.getAllStudents);

// GET - Display new student form
router.get('/new', studentController.createStudentForm);

// POST - Create new student
router.post('/', validateStudent, handleValidationErrors, studentController.createStudent);

// GET - Edit student form
router.get('/edit/:id', studentController.updateStudentForm);

// PUT - Update student
router.put('/:id', validateStudent, handleValidationErrors, studentController.updateStudent);

// POST - Update student (fallback for forms)
router.post('/:id', validateStudent, handleValidationErrors, studentController.updateStudent);

// DELETE - Delete student
router.delete('/:id', studentController.deleteStudent);

// POST - Delete student (fallback for forms)
router.post('/delete/:id', studentController.deleteStudent);

module.exports = router;
