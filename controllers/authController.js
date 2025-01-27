const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("../models/user.js");
const Student = require("../models/student.js");
const Company = require("../models/company.js");
const College = require("../models/college.js");

// Helper function to create JWT tokens
const createToken = (userId, userType) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Helper function to generate user_id
const generateUserId = (userType) => {
  const prefix = userType.substring(0, 3).toUpperCase();
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
  return `${prefix}${randomNumber}`;
};

// Register User
const register = async (req, res) => {
  const { userType, name, email, password, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const userId = generateUserId(userType);
    if (!userId) {
      res.status(400).json({ message: "Failed to generate user ID" });
      return;
    }

    // Hash the password with argon2
    const hashedPassword = await argon2.hash(password);

    let userDetails;
    if (userType === "Student") {
      if (!req.file) {
        res.status(400).json({ message: "Resume file is required" });
        return;
      }

      const fileExt = path.extname(req.file.originalname).toLowerCase();
      if (![".pdf", ".doc", ".docx"].includes(fileExt)) {
        res.status(400).json({ message: "Only PDF/DOC files are allowed" });
        return;
      }

      const resumePath = path.join("uploads", req.file.filename);

      userDetails = await Student.create({
        user_id: userId,
        name,
        email,
        phoneNumber,
        resume: resumePath,
        password: hashedPassword,
      });
    } else if (userType === "Company") {
      userDetails = await Company.create({
        user_id: userId,
        companyName: name,
        email,
        phoneNumber,
        password: hashedPassword,
      });
    } else if (userType === "College") {
      userDetails = await College.create({
        user_id: userId,
        collegeName: name,
        email,
        phoneNumber,
        password: hashedPassword,
      });
    } else {
      res.status(400).json({ message: "Invalid user type" });
      return;
    }

    await User.create({
      user_id: userId,
      email,
      password: hashedPassword,
      userType,
    });

    const token = createToken(userId, userType);

    res.status(201).json({
      message: `${userType} registered successfully`,
      token,
      user: {
        user_id: userId,
        email,
        userType,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    

    // Compare the plain password with the hashed password using argon2
    const isPasswordValid = await argon2.verify(user.password, password.trim());

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    let userDetails;
    if (user.userType === "Student") {
      userDetails = await Student.findOne({ user_id: user.user_id });
    } else if (user.userType === "Company") {
      userDetails = await Company.findOne({ user_id: user.user_id });
    } else if (user.userType === "College") {
      userDetails = await College.findOne({ user_id: user.user_id });
    }

    const token = createToken(user._id.toString(), user.userType);

    res.status(200).json({
      token,
      user: { ...user.toObject(), details: userDetails },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
