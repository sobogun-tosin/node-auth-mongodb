const express = require("express");
const router = express.Router();

const {
  getBlogs,
  postBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getBlogs);

router.post("/", protect, postBlog);

router.put("/:id", protect, updateBlog);

router.delete("/:id", protect, deleteBlog);

module.exports = router;
