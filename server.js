const express = require("express");
const database = require("./database");
const bodyParser = require("body-parser");
const registerRouter = require("./router/register.router");
const developersRouter = require("./router/developers.router");
const loginRouter = require("./router/login.router");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
require("./authentication/passport");
require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 80;

server.use(
  session({
    store: MongoStore.create({ mongoUrl: database.databaseUrl }),
    secret: "developers-secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 300000,
    },
  })
);

server.use(passport.initialize());
server.use(passport.session());

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
