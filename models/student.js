const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define schema
const StudentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: (phone) => /^\+?[0-9]{7,15}$/.test(phone),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    resume: { type: String, required: [true, "Resume URL is required"] },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: (date) => date <= new Date(),
        message: "Date of birth must be in the past",
      },
    },
    education: {
      degree: { type: String, trim: true },
      institution: { type: String, trim: true },
      graduationYear: {
        type: Number,
        validate: {
          validator: (year) => year <= new Date().getFullYear() + 10,
          message: (props) => `${props.value} is not a valid graduation year!`,
        },
      },
    },
    skills: {
      type: [String],
      default: [],
    },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "CreateJob" }],
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "CreateJob" }],
    appliedInternships: [
      { type: mongoose.Schema.Types.ObjectId, ref: "InternshipRequest" },
    ],
    appliedHackathons: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
    ], // New field for hackathon applications
    user_type: { type: String, default: "Student", immutable: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save Hook: Add Password Encryption
StudentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Error Handling for Unique Fields
StudentSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const validationError = new mongoose.Error.ValidationError();
    validationError.addError(
      field,
      new mongoose.Error.ValidatorError({
        path: field,
        message: `${field} must be unique. "${error.keyValue[field]}" is already in use.`,
        value: error.keyValue[field],
      })
    );
    next(validationError);
  } else {
    next(error);
  }
});

// Create Model
const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;
