const Student = require('../models/Student');
const mongoose = require('mongoose');

// Get all students
exports.getAllStudents = async (req, res, next) => {
  try {
    // For now, return empty list to get the UI working
    const students = [];
    res.status(200).render('index', {
      title: 'Student Management System',
      students: students,
      message: 'Application is running! MongoDB connection will be configured soon.'
    });
  } catch (error) {
    console.error('Error in getAllStudents:', error);
    res.status(200).render('index', {
      title: 'Student Management System',
      students: [],
      message: 'Application is running!'
    });
  }
};

// Get student by ID
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).render('error', {
        message: 'Student not found',
        error: {}
      });
    }
    res.status(200).render('edit', {
      title: 'Edit Student',
      student: student
    });
  } catch (error) {
    res.status(500).render('error', {
      message: 'Error fetching student',
      error: error
    });
  }
};

// Create new student (render form)
exports.createStudentForm = (req, res) => {
  res.status(200).render('create', {
    title: 'Add New Student'
  });
};

// Create new student (post)
exports.createStudent = async (req, res, next) => {
  try {
    const { name, roll, email, phone, address } = req.body;

    if (!name || !roll || !email || !phone || !address) {
      return res.status(400).render('create', {
        title: 'Add New Student',
        message: 'All fields are required'
      });
    }

    const student = await Student.create({
      name,
      roll,
      email,
      phone,
      address
    });

    res.status(201).redirect('/?message=Student added successfully');
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).render('create', {
        title: 'Add New Student',
        message: `${field} already exists`
      });
    }

    const errorMessage = error.errors ? Object.values(error.errors)[0].message : 'Error creating student';
    res.status(400).render('create', {
      title: 'Add New Student',
      message: errorMessage
    });
  }
};

// Update student (render form)
exports.updateStudentForm = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).render('error', {
        message: 'Student not found',
        error: {}
      });
    }
    res.status(200).render('edit', {
      title: 'Edit Student',
      student: student
    });
  } catch (error) {
    res.status(500).render('error', {
      message: 'Error fetching student',
      error: error
    });
  }
};

// Update student (post)
exports.updateStudent = async (req, res, next) => {
  try {
    const { name, roll, email, phone, address } = req.body;

    if (!name || !roll || !email || !phone || !address) {
      return res.status(400).render('edit', {
        title: 'Edit Student',
        student: req.body,
        message: 'All fields are required'
      });
    }

    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).render('error', {
        message: 'Student not found',
        error: {}
      });
    }

    student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, roll, email, phone, address },
      { new: true, runValidators: true }
    );

    res.status(200).redirect('/?message=Student updated successfully');
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).render('edit', {
        title: 'Edit Student',
        student: req.body,
        message: `${field} already exists`
      });
    }

    const errorMessage = error.errors ? Object.values(error.errors)[0].message : 'Error updating student';
    res.status(400).render('edit', {
      title: 'Edit Student',
      student: req.body,
      message: errorMessage
    });
  }
};

// Delete student
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).render('error', {
        message: 'Student not found',
        error: {}
      });
    }
    res.status(200).redirect('/?message=Student deleted successfully');
  } catch (error) {
    res.status(500).render('error', {
      message: 'Error deleting student',
      error: error
    });
  }
};
