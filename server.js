const express = require("express");
const database = require("./database");
const bodyParser = require("body-parser");
const Developer = require("./models/Developer");
require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 80;

server.use(bodyParser.json());

server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

server.get("/register", (_req, res) => {
  res.render("register");
});

server.post("/register", (req, res) => {
  const newDeveloper = Developer({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  return newDeveloper.save().then(() => {
    res.status(201).redirect("/login");
  });
});

database.connectDatabase().then(() => {
  console.log("\n-> Connected to the database...");
  server.listen(PORT, () => {
    console.log(`-> Server listening on port ${PORT}\n`);
  });
});
