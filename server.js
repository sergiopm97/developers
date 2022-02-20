const express = require("express");
const database = require("./database");
const bodyParser = require("body-parser");
const registerRouter = require("./router/register.router");
const developersRouter = require("./router/developers.router");
const loginRouter = require("./router/login.router");
require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 80;

server.use(bodyParser.json());

server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

server.use("/register", registerRouter);
server.use("/login", loginRouter);
server.use("/api/developers", developersRouter);

database.connectDatabase().then(() => {
  console.log("\n-> Connected to the database...");
  server.listen(PORT, () => {
    console.log(`-> Server listening on port ${PORT}\n`);
  });
});
