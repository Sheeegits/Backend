import dotenv from "dotenv";
import passport from "passport";
import LinkedInStrategy from "passport-linkedin-oauth2";
import jwt from "jsonwebtoken";
dotenv.config();
LinkedInStrategy.Strategy;
const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const CALLBACK_URL = process.env.LINKEDIN_CALLBACK_URL;
const JWT_SECRET = process.env.JWT_SECRET;

passport.use(
  new LinkedInStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
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
          profilePhoto: profile.photos[0].value,
        };

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
