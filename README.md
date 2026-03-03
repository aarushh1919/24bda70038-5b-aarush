# Student Management System (MVC)

A full-featured Student Management System built with Node.js, Express.js, MongoDB, and EJS templating engine following the MVC (Model-View-Controller) architecture pattern.

## Features

- ✅ **MVC Architecture**: Clean separation of concerns with Models, Views, and Controllers
- ✅ **RESTful Routing**: Standard REST conventions for API endpoints
- ✅ **MongoDB Integration**: Persistent data storage with Mongoose ODM
- ✅ **Validation Middleware**: Comprehensive form validation using express-validator
- ✅ **Error Handling**: Centralized error handling with custom error pages
- ✅ **EJS Templating**: Dynamic HTML rendering with EJS
- ✅ **Responsive UI**: Mobile-friendly interface with clean design
- ✅ **CRUD Operations**: Complete Create, Read, Update, Delete functionality

## Project Structure

```
student-management-system/
├── models/
│   └── Student.js                 # Student data model with validation
├── controllers/
│   └── studentController.js       # Business logic for student operations
├── routes/
│   └── studentRoutes.js          # Express routes for student endpoints
├── views/
│   ├── index.ejs                 # Main student listing page
│   ├── create.ejs                # Add new student form
│   ├── edit.ejs                  # Edit student form
│   └── error.ejs                 # Error display page
├── middleware/
│   └── validation.js             # Validation and error handling middleware
├── public/
│   └── css/
│       └── style.css             # Styling for all pages
├── app.js                        # Main application file
├── package.json                  # Project dependencies
├── .env                          # Environment variables
└── README.md                     # Project documentation
```

## Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **MongoDB**: 4.4 or higher (Local or Atlas)
- **RAM**: 8GB minimum
- **Processor**: i5+ CPU or equivalent

## Installation

1. **Clone or Extract the Project**
   ```bash
   cd student-management-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup MongoDB**
   - **Local MongoDB**: Ensure MongoDB is running on `mongodb://localhost:27017`
   - **MongoDB Atlas**: Update `.env` file with your connection string

4. **Configure Environment Variables**
   
   Edit `.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/student-management-system
   APP_NAME=Student Management System
   ```

5. **Start the Server**
   ```bash
   # Production
   npm start

   # Development (with auto-reload)
   npm run dev
   ```

   The server will start on `http://localhost:3000`

## Usage

### Home Page
- View all students in a clean card-based layout
- Click "New Student" button to add a new student

### Add New Student
- Navigate to the "New Student" page
- Fill in all the required fields:
  - **Name**: Student's full name (2-50 characters)
  - **Roll Number**: Unique roll number
  - **Email**: Valid email address
  - **Phone**: 10-digit phone number
  - **Address**: Complete address (minimum 5 characters)
- Click "Add Student" button

### Edit Student
- Click the "Edit" button on any student card
- Modify the student information
- Click "Update Student" button

### Delete Student
- Click the "Delete" button on any student card
- Confirm deletion in the popup

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all students |
| GET | `/new` | Display new student form |
| POST | `/` | Create new student |
| GET | `/edit/:id` | Display edit form for a student |
| POST | `/:id` | Update student information |
| POST | `/delete/:id` | Delete a student |

## Validation Rules

### Student Form Validation
- **Name**: Required, 2-50 characters
- **Roll Number**: Required, positive integer, unique
- **Email**: Required, valid email format, unique
- **Phone**: Required, exactly 10 digits
- **Address**: Required, minimum 5 characters

## Middleware

### Validation Middleware (`middleware/validation.js`)
- Validates all student form inputs
- Returns detailed error messages
- Handles duplicate entry errors
- Sanitizes input data

### Error Handling Middleware
- Catches all application errors
- Displays user-friendly error pages
- Shows detailed error information in development

## Styling

The application features a professional, responsive design:
- Clean and modern UI
- Mobile-responsive layout
- Smooth transitions and hover effects
- Accessibility-friendly color scheme
- Proper spacing and typography

## Models

### Student Schema
```javascript
{
  name: String (required, unique)
  roll: Number (required, unique)
  email: String (required, unique, email format)
  phone: String (required, 10 digits)
  address: String (required, minimum 5 characters)
  createdAt: Date (auto-generated)
}
```

## Error Handling

The application includes comprehensive error handling:
- Input validation errors
- Duplicate entry errors
- Database connection errors
- 404 Not Found errors
- 500 Internal Server errors
- Custom error page with detailed information

## Future Enhancements

- Authentication and authorization
- Advanced search and filtering
- Pagination for large datasets
- Export student data to CSV/PDF
- Student dashboard with statistics
- Batch import functionality
- Email notifications

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Frontend**: EJS, HTML5, CSS3
- **Validation**: express-validator
- **Environment**: dotenv

## Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running. Start it with:
```bash
mongod
```

### Port Already in Use
**Solution**: Change PORT in `.env` file or kill the process using port 3000

### Module Not Found
**Solution**: Reinstall dependencies
```bash
npm install
```

## License

ISC License - Feel free to use this project

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.

---

**Happy Learning! 🚀**

Built with ❤️ using Node.js, Express.js, and MongoDB
