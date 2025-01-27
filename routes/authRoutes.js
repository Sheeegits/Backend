const express = require("express");
const passport = require("passport");
const { register, login } = require("../controllers/authController.js");
const upload = require("../middleware/upload.js");

const router = express.Router();

// Register route (Manual)
router.post("/register", upload.single("resume"), register);

// Login Route (Manual)
router.post("/login", login);

// Google Authentication Route (START GOOGLE LOGIN)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Authentication Callback Route (AFTER USER SELECTS GOOGLE ACCOUNT)
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    try {
      const { token: accessToken, user } = req.user;

      res.status(200).json({
        message: "Google login successful",
        token: accessToken,
        user, // User details
      });
    } catch (error) {
      console.error("Google authentication failed:", error);
      res.status(500).json({ error: "Failed to authenticate with Google" });
    }
  }
);

module.exports = router;
