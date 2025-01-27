const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (email) {
          return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email); // Regex for email validation
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      trim: true,
    },
    userType: {
      type: String,
      required: true,
      enum: {
        values: ["Student", "Company", "College"],
        message: "{VALUE} is not a valid user type",
      },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Static method to find a user by email
userSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email });
};



// Post-save hook to handle duplicate key errors
userSchema.post("save", function (error, doc, next) {
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

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
