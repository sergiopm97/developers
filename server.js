const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 80;

server.use(bodyParser.json());

server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

server.use("/register", (req, res)  => {
    res.render("register");
});

server.listen(PORT, () => {
    console.log(`\n-> Server listening on port ${PORT}`);
});