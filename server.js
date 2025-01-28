import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

// Import Routes
dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import linkedinAuthRoutes from "./routes/linkedinAuthRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import hackathonRoutes from "./routes/hackathonRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import internshipRequestRoutes from "./routes/internshipRequestRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import offCampusRequestRoutes from "./routes/offCampusRequestRoutes.js";
import onCampusRequestRoutes from "./routes/onCampusRequestRoutes.js";
import createJobRoutes from "./routes/createJobRoutes.js";
import collegeServiceRoutes from "./routes/collegeServiceRoutes.js";
import companyServiceRoutes from "./routes/companyServiceRoutes.js";

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
import "./middleware/passport.js"; // Loads authentication strategies
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
