const helmet = require("helmet");
const express = require("express");
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes go here
app.use("/", (req, res, next) => {
  console.log("We are working");
});
// app.use('/route', router)

module.exports = app; // default export
