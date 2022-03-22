const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a valid username"],
    },
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
