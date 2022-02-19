const express = require("express");
const Developer = require("../models/Developer");

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).render("register");
});

router.post("/", async (req, res) => {
  const existingDeveloper = await Developer.findOne({ email: req.body.email });
  if (existingDeveloper) {
    return res.status(409).send(`Developer with email ${req.body.email} already exists in the database...`);
  }
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
