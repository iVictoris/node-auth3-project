const { Router } = require("express");
const router = Router();
const { find } = require("../data/model/user");

router.route("/").get(async (req, res) => {
  /* GET  */
  const users = await find();
  res.status(200).json(users);
});

module.exports.router = router;
