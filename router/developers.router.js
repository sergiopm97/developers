const express = require("express");
const Developer = require("../models/Developer");
const ObjectId = require("mongodb").ObjectId;

const router = express.Router();

router.get("/", async (_req, res) => {
  return res.status(200).json(await Developer.find());
});

router.delete("/id/:id", async (req, res) => {
  const existingDeveloper = await Developer.findOne({ _id: ObjectId(req.params.id) });
  if (!existingDeveloper) {
    return res.status(400).send(`Developer with ID ${req.params.id} does not exist in the database...`);
  }
  return Developer.findOneAndDelete({ _id: ObjectId(req.params.id) }).then(() => {
    res.status(200).send(`Developer with ID ${req.params.id} has been removed from the database!`);
  });
});

router.put("/id/:id", async (req, res) => {
  const updatedDeveloper = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const existingDeveloper = await Developer.findOne({ _id: ObjectId(req.params.id) });
  if (!existingDeveloper) {
    return res.status(400).send(`Developer with ID ${req.params.id} does not exist in the database...`);
  }
  Developer.findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: updatedDeveloper }).then(() => {
    res.status(200).send(`Developer with ID ${req.params.id} has been updated in the database!`);
  });
});

module.exports = router;
