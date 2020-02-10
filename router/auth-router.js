const { Router } = require("express");
const router = Router();

router.route("/register").post(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: "Missing credentials. Please try again."
    });
});

router.route("/login").post(async (req, res) => {});

module.exports.router = router;
