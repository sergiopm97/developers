const express = require("express");
require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 80;

server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

server.use("/", (req, res)  => {
    res.render("index");
});

server.listen(PORT, () => {
    console.log(`\n-> Server listening on port ${PORT}`);
});