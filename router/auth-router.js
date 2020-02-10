const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();

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

router.route("/login").post(async (req, res) => {
  // get username and password from body
  const { username, password } = req.body;
  // and check it
  if (!username || !password)
    return res.status(400).json({
      message: "Credentials are missing. Please try again."
    });

  // get user from db
  try {
    const userFromDb = await findByUsername(username).first();

    const isValidCredentials = bcrypt.compareSync(
      password,
      userFromDb.password
    );

    if (!isValidCredentials)
      return res.status(401).json({
        message: "Invalid credentials, wrong username or password."
      });

    // token generation should go here somewhere
    const token = generateToken(userFromDb);

    res.status(200).json({ message: "logged in", token });
  } catch (e) {
    res.status(500).json({
      message: "Unexpected error retrieving user."
    });
  }
});

const generateToken = user => {
  const secret = process.env.JWT_SECRET; // in .env file
  const payload = {
    userId: user.id
  };
  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, secret, options);
};

module.exports.router = router;
