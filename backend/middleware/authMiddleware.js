const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        // Verify user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Get user from token
        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.log(error);
        res.json({
          message: error.message,
          stack: error.stack,
        });
        res.status(401);
        throw new Error("User not authorized");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("User not authorized, no token");
    }
  } catch (error) {
    res.json({
      message: error.message,
      stack: error.stack,
    });
    res.status(401);
    throw new Error("User not authorized");
  }
};

module.exports = { protect };
