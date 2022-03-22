const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please enter a blog title"],
    },
    message: {
      type: String,
      required: [true, "Please enter a blog message"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blogs", blogSchema);
