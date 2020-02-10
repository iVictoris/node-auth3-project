const helmet = require("helmet");
const express = require("express");
const app = express();

// router imports
const { router: authRouter } = require("../router/auth-router");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes go here
app.use("/", (req, res, next) => {
  console.log("We are working");
  res.status(200).json({ message: "ok" });
});

app.use("/api/auth", authRouter);

module.exports = app; // default export
