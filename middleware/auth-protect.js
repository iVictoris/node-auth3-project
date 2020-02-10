const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  const secret = process.env.JWT_SECRET;

  if (!token)
    return res.status(403).json({
      message: "Access Denied."
    });

  // verify token
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err)
      return res.status(403).json({
        message: "Access Denied. Identity invalid."
      });

    next();
  });
};

module.exports = auth;
