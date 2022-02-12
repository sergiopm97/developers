const express = require("express");
require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
    console.log(`\n-> Server listening on port ${PORT}`);
});