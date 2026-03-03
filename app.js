const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const studentRoutes = require('./routes/studentRoutes');
const { errorHandler, notFound } = require('./middleware/validation');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-management-system';

// ============================================
// MIDDLEWARE
// ============================================

// Static files
app.use(express.static('public'));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// ============================================
// DATABASE CONNECTION
// ============================================

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB connected successfully');
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    // Don't exit in production, let the error handler deal with it
});

// ============================================
// ROUTES
// ============================================

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'App is working!', timestamp: new Date() });
});

// Simple test route for rendering
app.get('/simple', (req, res) => {
    res.send('<html><body><h1>Simple Test - App is Working!</h1><a href="/test">Test API</a></body></html>');
});

// Temporary root route to bypass student controller
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Student Management System</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .container { max-width: 800px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 40px; }
                .btn { background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
                .alert { background: #d4edda; color: #155724; padding: 15px; margin: 20px 0; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎓 Student Management System</h1>
                    <a href="/new" class="btn">Add New Student</a>
                </div>
                <div class="alert">
                    ✅ Application is successfully deployed on Vercel!<br>
                    📝 MongoDB integration will be configured next.<br>
                    🔗 Live at: https://24bda70038-5b-aarush.vercel.app
                </div>
                <div>
                    <h3>Test Routes:</h3>
                    <ul>
                        <li><a href="/test">Test API Endpoint</a></li>
                        <li><a href="/simple">Simple HTML Test</a></li>
                    </ul>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Student routes (commented out temporarily)
// app.use('/', studentRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// ============================================
// SERVER STARTUP
// ============================================

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`
        🎓 Student Management System
        ================================
        Server running on http://localhost:${PORT}
        Environment: ${process.env.NODE_ENV || 'development'}
        Database: ${MONGODB_URI}
        ================================
        `);
    });
}

module.exports = app;
