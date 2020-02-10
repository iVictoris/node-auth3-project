const helmet = require("helmet");
const express = require("express");
const app = express();

const auth = require("../middleware/auth-protect");

// router imports
const { router: authRouter } = require("../router/auth-router");
const { router: userRouter } = require("../router/userRouter");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes go here

app.use("/api/auth", authRouter);
app.use("/api/users", auth, userRouter);

app.use("/", (req, res, next) => {
  console.log("We are working");
  res.status(200).json({ message: "ok" });
});

module.exports = app; // default export
