const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.Authorization;

  if (!token)
    return res.status(404).json({
      message: "Access Denied."
    });

  next();
};
