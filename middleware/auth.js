const express = require("express");
const passport = require("passport");
const { register, login } = require("../controllers/authController.js");
require("../controllers/googleAuthController.js"); // Ensure Google authentication is initialized
const upload = require("../middleware/upload.js");
const verifyToken = require("../middlewares/auth.js"); // Import JWT authentication middleware

const router = express.Router();

// Register route (Manual)
router.post("/register", upload.single("resume"), register);

// Login Route (Manual)
router.post("/login", login);

// Google Authentication Route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Authentication Callback Route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.status(200).json({
      message: "Google login successful",
      token: req.user.token, // Send JWT token
      user: req.user.user,   // User details
    });
  }
);

// Example of a protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "This is a protected profile route", user: req.user });
});

module.exports = router;
