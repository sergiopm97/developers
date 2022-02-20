const express = require("express");

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).render("login");
});

module.exports = router;
