import { google } from "googleapis";

const CLIENT_ID =
  "30860311309-06oj8343luvomfv11m8j1q7rtin6j69d.apps.googleusercontent.com"; // Replace with your actual client ID
const CLIENT_SECRET = "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"; // Replace with your actual client secret
const REDIRECT_URI = "http://localhost:5000/auth/google/callback"; // Should match your Google Cloud settings

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Generate the Google Auth URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline", // Required to get a refresh token
  scope: ["https://mail.google.com/"], // Adjust scope as needed
  prompt: "consent", // Ensures getting a refresh token every time
});

console.log("Authorize this app by visiting this URL:", authUrl);
