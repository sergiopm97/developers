const express = require("express");
const Developer = require("../models/Developer");

const router = express.Router();

router.get("/", (_req, res) => {
  res.render("register");
});

router.post("/", (req, res) => {
  const newDeveloper = Developer({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  return newDeveloper.save().then(() => {
    res.status(201).redirect("/login");
  });
});

module.exports = router;
