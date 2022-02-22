const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).render("login");
});

router.post("/", (req, res, next) => {
  const login = (error, developer) => {
    if (error) {
      return next(error);
    }
    req.logIn(developer, (errorLogin) => {
      if (errorLogin) {
        return next(errorLogin);
      }
      return res.status(200).json(developer);
    });
  };
  passport.authenticate("login", login)(req);
});

module.exports = router;
