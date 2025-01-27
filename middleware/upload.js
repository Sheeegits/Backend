const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define the upload folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Create a unique filename
  },
});

// File filter for PDF/DOC/DOCX
const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  if ([".pdf", ".doc", ".docx"].includes(fileExt)) {
    cb(null, true); // Accept the file
  } else {
    // Reject the file with an error message
    cb(new Error("Only PDF/DOC files are allowed"), false);
  }
};

// Initialize upload middleware
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
