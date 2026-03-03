const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a student name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name must not exceed 50 characters']
  },
  roll: {
    type: Number,
    required: [true, 'Please provide a roll number'],
    unique: true,
    min: [1, 'Roll number must be a positive number']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    unique: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
    minlength: [5, 'Address must be at least 5 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);
