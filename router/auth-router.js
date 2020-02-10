const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const { add, findByUsername } = require("../data/model/user");

router.route("/register").post(async (req, res) => {
  const { username, password, department } = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: "Missing credentials. Please try again."
    });

  // some validation lib for data goes here ...
  // hash password
  const hashedPassword = bcrypt.hashSync(password, 14);

  // add user to db
  // should check to see if user is not in db
  try {
    const userInDb = await findByUsername(username).first();

    if (userInDb)
      return res.status(500).json({
        message: "Invalid information given. Please try again."
      });

    const userFromData = {
      username,
      password: hashedPassword,
      department
    };

    const user = await add(userFromData);
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({
      message: "Unexpected response. Please try again" + e
    });
  }
});

router.route("/login").post(async (req, res) => {});

module.exports.router = router;
