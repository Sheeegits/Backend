require("dotenv").config();
const { google } = require("googleapis");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Load credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const JWT_SECRET = process.env.JWT_SECRET;

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Function to refresh access token
async function getAccessToken() {
  try {
    const { credentials } = await oAuth2Client.refreshAccessToken();
    console.log("✅ New Access Token:", credentials.access_token);
    return credentials.access_token;
  } catch (error) {
    console.error("❌ ERROR: Failed to refresh access token", error);
    throw error;
  }
}

// Google authentication strategy using Passport.js
passport.use(
  new (require("passport-google-oauth20")).Strategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Generate JWT token
        const token = jwt.sign(
          { id: profile.id, email: profile.emails[0].value },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePhoto: profile.photos[0].value,
        };

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = { getAccessToken, oAuth2Client };
