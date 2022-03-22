const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const pageRoutes = require("./routes/pageRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const app = express();

// Connect to MongoDB
connectDB();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);
app.use(pageRoutes);

//Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
