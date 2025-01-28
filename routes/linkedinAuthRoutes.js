import express from "express";
import passport from "passport";

const router = express.Router();

// Start LinkedIn login
router.get("/linkedin", passport.authenticate("linkedin", { state: true }));

// LinkedIn Authentication Callback Route
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      const accessToken = req.user.token;
      res.status(200).json({
        message: "LinkedIn login successful",
        token: accessToken,
        user: req.user.user,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to authenticate with LinkedIn" });
    }
  }
);

export default router;
