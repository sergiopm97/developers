const express = require("express");
const database = require("./database");
const bodyParser = require("body-parser");
require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 80;

server.use(bodyParser.json());

server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

server.use("/register", (req, res) => {
  res.render("register");
});

database.connectDatabase().then(() => {
  console.log("\n-> Connected to the database...");
  server.listen(PORT, () => {
    console.log(`-> Server listening on port ${PORT}\n`);
  });
});
