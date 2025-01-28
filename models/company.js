import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define schema
const CompanySchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
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
    industry: { type: String, default: "Not specified" },
    user_type: { type: String, default: "Company", immutable: true },
    job_postings: [{ type: mongoose.Schema.Types.ObjectId, ref: "CreateJob" }],
    event_requests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "EventRequest" },
    ],
    internship_offers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "InternshipRequest" },
    ],
    hackathon_applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
    ],
    on_campus_requests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "OnCampusRequest" },
    ],
    off_campus_requests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "OffCampusRequest" },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Error Handling for Unique Fields
CompanySchema.post("save", function (error, doc, next) {
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
CompanySchema.index({ email: 1, user_id: 1 }, { unique: true });

// Create Model
const CompanyModel = mongoose.model("Company", CompanySchema);

export default CompanyModel;
