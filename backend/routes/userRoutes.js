const express = require("express");
const router = express.Router();
const {
  getUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getUser);

router.post("/login", loginUser);

router.post("/register", registerUser);

module.exports = router;
