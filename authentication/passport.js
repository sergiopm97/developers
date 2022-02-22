const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Developer = require("../models/Developer");

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const existingDeveloper = await Developer.findOne({ email: email });
        if (!existingDeveloper) {
          const error = new Error("Developer not found in database...");
          return done(error);
        }
        if (password != existingDeveloper.password) {
          const error = new Error("Incorrect password");
          return done(error);
        }
        existingDeveloper.password = undefined;
        return done(null, existingDeveloper);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const developer = await Developer.findById(userId);
    return done(null, developer);
  } catch (error) {
    return done(error);
  }
});
