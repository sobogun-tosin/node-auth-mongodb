const router = require("express").Router();

const date = new Date().getFullYear();

router.get("/", (req, res) => {
  res.render("index", { date, title: "Home" });
});

router.get("/about", (req, res) => {
  res.render("about", { date, title: "About" });
});

router.get("/about-us", (req, res) => {
  res.redirect("./about");
});

router.get("/contact", (req, res) => {
  res.render("contact", { date, title: "Contact us" });
});

router.use((req, res, next) => {
  res.status(404).render("404");
  next();
});

module.exports = router;
