import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define schema
const CollegeSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    collegeName: {
      type: String,
      required: [true, "College name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
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
    location: { type: String, default: "Not provided" },
    user_type: { type: String, default: "College", immutable: true },
    on_campus_requests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "OnCampusRequest" },
    ],
    off_campus_requests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "OffCampusRequest" },
    ],
    internship_requests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "InternshipRequest" },
    ],
    hackathon_applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Error Handling for Unique Fields
CollegeSchema.post("save", function (error, doc, next) {
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

// Indexing
CollegeSchema.index({ email: 1, user_id: 1 }, { unique: true });

// Prevent Overwriting Model
const CollegeModel =
  mongoose.models.College || mongoose.model("College", CollegeSchema);

export default CollegeModel;
