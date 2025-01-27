require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session"); // Import express-session

// Import Routes
const authRoutes = require("./routes/authRoutes.js");
const linkedinAuthRoutes = require("./routes/linkedinAuthRoutes.js");
const collegeRoutes = require("./routes/collegeRoutes");
const companyRoutes = require("./routes/companyRoutes");
const studentRoutes = require("./routes/studentRoutes");
const hackathonRoutes = require("./routes/hackathonRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const internshipRequestRoutes = require("./routes/internshipRequestRoutes");
const jobRoutes = require("./routes/jobRoutes");
const offCampusRequestRoutes = require("./routes/offCampusRequestRoutes");
const onCampusRequestRoutes = require("./routes/onCampusRequestRoutes");
const createJobRoutes = require("./routes/createJobRoutes");
const collegeServiceRoutes = require("./routes/collegeServiceRoutes");
const companyServiceRoutes = require("./routes/companyServiceRoutes");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Set up session middleware before initializing Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "TalentConnect", // Add a secret key for session
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
require("./middleware/passport.js"); // Loads authentication strategies
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", linkedinAuthRoutes); 
app.use("/api/colleges", collegeRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/internship-requests", internshipRequestRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/offcampusrequests", offCampusRequestRoutes);
app.use("/api/oncampusrequests", onCampusRequestRoutes);
app.use("/api/jobs", createJobRoutes);
app.use("/api/college-services", collegeServiceRoutes);
app.use("/api/company-services", companyServiceRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
