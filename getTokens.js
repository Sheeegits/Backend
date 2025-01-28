import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();
// Load credentials from .env file
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Initialize OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Step 1: Generate Authorization URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
  prompt: "consent",
});

console.log("\n🔗 Open this URL in your browser and sign in:");
console.log(authUrl);

// 🔽 **Paste the authorization code here** (Extract the code from the URL you get)
const authCode = "";

// Step 2: Function to exchange the code for tokens
async function getNewTokens(code) {
  if (!code) {
    console.error("ERROR: Authorization code is required.");
    return;
  }

  try {
    console.log("\n Fetching tokens...");

    // Exchange authorization code for tokens
    const { tokens } = await oAuth2Client.getToken(code);

    console.log("\n SUCCESS! Tokens received:");
    console.log("Access Token:", tokens.access_token);
    console.log(
      "Refresh Token:",
      tokens.refresh_token || "No Refresh Token (Already Used)"
    );
    console.log("Token Expiry:", new Date(tokens.expiry_date).toLocaleString());
  } catch (error) {
    console.error(
      " ERROR: Failed to retrieve access token",
      error.response ? error.response.data : error
    );
  }
}

// Run the function with the provided code
getNewTokens(authCode);
