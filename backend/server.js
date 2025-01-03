const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize environment variables
dotenv.config();

// Create the Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  personalEmail: { type: String }, // Only for admins
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Create User and Admin models
const User = mongoose.model('User', userSchema, 'users');
const Admin = mongoose.model('Admin', userSchema, 'admins');

// ** User/Admin Registration Endpoint **
app.post('/register', async (req, res) => {
  const { fullName, email, mobile, password, role, personalEmail } = req.body;

  // Input validation
  if (!fullName || !email || !mobile || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user/admin already exists
    const existingUser = await User.findOne({ email });
    const existingAdmin = await Admin.findOne({ email });
    if (existingUser || existingAdmin) {
      return res.status(400).json({ message: 'User/Admin with this email already exists' });
    }

    let newUser;
    if (role === 'admin') {
      if (!personalEmail) {
        return res.status(400).json({ message: 'Admin must provide a personal email' });
      }
      newUser = new Admin({ fullName, email, mobile, password, role, personalEmail });
    } else {
      newUser = new User({ fullName, email, mobile, password, role });
    }

    await newUser.save();
    res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!` });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
});

// ** User/Admin Login Endpoint **
app.post('/login', async (req, res) => {
  const { email, password, role, fullName, personalEmail } = req.body;

  try {
    if (role === 'admin') {
      if (!fullName || !personalEmail) {
        return res.status(400).json({ message: 'Full Name and Personal Email are required for Admin login.' });
      }

      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ message: 'Admin not found' });

      if (admin.fullName !== fullName || admin.personalEmail !== personalEmail) {
        return res.status(400).json({ message: 'Admin details (Full Name or Personal Email) do not match' });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Admin login successful', token });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'User login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Initialize environment variables
// dotenv.config();

// // Create the Express app
// const app = express();

// // Middleware setup
// app.use(cors());
// app.use(bodyParser.json());  // Parse JSON requests

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   serverSelectionTimeoutMS: 5000 // Increase timeout duration if needed
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // Define the User Schema (Shared by both user and admin)
// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mobile: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['user', 'admin'], default: 'user' },
//   personalEmail: { type: String }, // For admin role only
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Create the User model (User collection)
// const User = mongoose.model('User', userSchema, 'users'); // Explicitly specify 'users' collection

// // Create the Admin model (Admin collection)
// const Admin = mongoose.model('Admin', userSchema, 'admins'); // Explicitly specify 'admins' collection

// // POST route for registration
// app.post('/register', async (req, res) => {
//   const { fullName, email, mobile, password, role, personalEmail } = req.body;

//   // Validate the input data
//   if (!fullName || !email || !mobile || !password || !role) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   // Check if user already exists (regardless of user or admin role)
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   // Create a new user or admin based on the role
//   let newUser;
//   if (role === 'admin') {
//     if (!personalEmail) {
//       return res.status(400).json({ message: 'Admin must provide a personal email' });
//     }

//     // Save the admin data to the 'admins' collection
//     newUser = new Admin({
//       fullName,
//       email,
//       mobile,
//       password,
//       role,
//       personalEmail, // Only set for admin
//     });
//   } else {
//     // Save the user data to the 'users' collection
//     newUser = new User({
//       fullName,
//       email,
//       mobile,
//       password,
//       role,
//     });
//   }

//   try {
//     // Save the user/admin to the appropriate collection
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'Error during registration' });
//   }
// });

// // POST route for login
// app.post('/login', async (req, res) => {
//   const { email, password, role, fullName, personalEmail } = req.body;

//   // Handle admin login
//   if (role === 'admin') {
//     // Check if fullName, personalEmail, and email are provided for admin login
//     if (!fullName || !personalEmail) {
//       return res.status(400).json({ message: 'Full Name and Personal Email are required for Admin.' });
//     }
    
//     // Search for admin in the 'admins' collection
//     const admin = await Admin.findOne({ email });
    
//     if (admin) {
//       console.log("Admin found in DB:", admin); // Add a log to check the admin details from the database

//       // Check if the fullName and personalEmail also match
//       if (admin.fullName === fullName && admin.personalEmail === personalEmail) {
//         // Compare passwords
//         const isPasswordValid = bcrypt.compareSync(password, admin.password);
//         if (isPasswordValid) {
//           return res.status(200).json({ message: 'Admin login successful' });
//         } else {
//           return res.status(400).json({ message: 'Invalid password for admin' });
//         }
//       } else {
//         return res.status(400).json({ message: 'Admin details (Full Name or Personal Email) do not match' });
//       }
//     } else {
//       return res.status(400).json({ message: 'Admin not found' });
//     }
//   }

//   // Handle user login
//   const user = await User.findOne({ email });
//   if (user && bcrypt.compareSync(password, user.password)) {
//     return res.status(200).json({ message: 'User login successful' });
//   } else {
//     return res.status(400).json({ message: 'Invalid email or password' });
//   }
// });


// // Set up the server to listen on a port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// // Required dependencies
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config(); // Load environment variables

// // Initialize express app
// const app = express();
// const port = process.env.PORT || 5000;  // Use PORT from .env or default to 5000

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());  // Parse incoming requests with JSON payload

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Error connecting to MongoDB:', err);
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['user'], default: 'user' },
//   mobile: { type: String, required: true },
// });

// // Admin Schema
// const adminSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin'], default: 'admin' },
//   mobile: { type: String, required: true },
//   adminCode: { type: String, required: true },
// });

// // Models
// const User = mongoose.model('User', userSchema);
// const Admin = mongoose.model('Admin', adminSchema);

// // User Registration Route
// app.post('/register/user', async (req, res) => {
//   const { username, email, password, mobile } = req.body;

//   if (!username || !email || !password || !mobile) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ username, email, password: hashedPassword, mobile });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error('Error registering user:', err);
//     res.status(500).json({ message: 'Error registering user', error: err.message });
//   }
// });

// // Admin Registration Route
// app.post('/register/admin', async (req, res) => {
//   const { username, email, password, mobile, adminCode } = req.body;

//   if (!username || !email || !password || !mobile || !adminCode) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Check if admin exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Admin already exists' });
//     }

//     // Validate admin code
//     if (adminCode !== 'yourAdminCodeHere') {
//       return res.status(400).json({ message: 'Invalid admin code' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new admin
//     const newAdmin = new Admin({ username, email, password: hashedPassword, mobile, adminCode });

//     await newAdmin.save();
//     res.status(201).json({ message: 'Admin registered successfully' });
//   } catch (err) {
//     console.error('Error registering admin:', err);
//     res.status(500).json({ message: 'Error registering admin', error: err.message });
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     const existingAdmin = await Admin.findOne({ email });
//     if (!existingUser && !existingAdmin) {
//       return res.status(400).json({ message: 'User or admin not found' });
//     }

//     let user = existingUser || existingAdmin;
    
//     // Compare password with hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (err) {
//     console.error('Error logging in user:', err);
//     res.status(500).json({ message: 'Error logging in user', error: err.message });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
