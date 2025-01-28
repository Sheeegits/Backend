import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library

// Define schema
const CreateJobSchema = new mongoose.Schema(
  {
    job_id: { type: String, required: true, unique: true, default: uuidv4 }, // Automatically generate job_id
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    skillset: { type: [String], required: true },
    location: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    salary: { type: Number, required: true, min: 0 },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Error Handling for Unique Fields
CreateJobSchema.post("save", function (error, doc, next) {
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
CreateJobSchema.index({ job_id: 1, company_id: 1 }, { unique: true });

// Create Model
const CreateJobModel = mongoose.model("CreateJob", CreateJobSchema);

export default CreateJobModel;
