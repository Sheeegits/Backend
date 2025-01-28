import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
GoogleStrategy.Strategy;
LinkedInStrategy.Strategy;

// Load credentials from .env
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_CALLBACK_URL = process.env.LINKEDIN_CALLBACK_URL;

const JWT_SECRET = process.env.JWT_SECRET;

// 🔹 Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const token = jwt.sign(
          { id: profile.id, email: profile.emails[0].value },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePhoto: profile.photos[0]?.value || null,
        };

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// 🔹 LinkedIn Strategy
passport.use(
  new LinkedInStrategy(
    {
      clientID: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      callbackURL: LINKEDIN_CALLBACK_URL,
      scope: ["r_emailaddress", "r_liteprofile"],
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const token = jwt.sign(
          { id: profile.id, email: profile.emails[0].value },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePhoto: profile.photos[0]?.value || null,
        };

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize User
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize User
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Export Passport
export default passport;
