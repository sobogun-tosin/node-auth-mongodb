const Blog = require("../models/blogModel");
const User = require("../models/userModel");

//GET blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });
    res.json(blogs);
  } catch (err) {
    res.status(400);
    res.json({ err: err.message });
  }
};

// POST blog
const postBlog = async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      res.status(400);
      throw new Error("Please enter a valid data");
    }

    const blog = await Blog.create({
      title: title,
      message: message,
      user: req.user.id,
    });
    res.json(blog);
  } catch (err) {
    res.status(400);
    res.json({ err: err.message });
  }
};

//UPDATE blog
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const updateBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blog) {
      throw new Error("Blog not found");
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User no found");
    }
    if (blog.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    res.json(updateBlog);
  } catch (err) {
    res.status(400);
    res.json({ err: err.message });
  }
};

//DELETE blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      throw new Error("Blog not found");
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User no found");
    }
    if (blog.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await blog.remove();
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(400);
    res.json({ err: err.message });
  }
};

module.exports = {
  getBlogs,
  postBlog,
  updateBlog,
  deleteBlog,
};
