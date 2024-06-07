const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  return jwt.decode(token, process.env.JWT_KEY);
};

module.exports = (req, res, next) => {
  const token = req.header("Authorization") || req.header("authorization");
  if (!token) return res.status(403).send("Access Denied! no token provided.");

  try {
    const user = decodeToken(token);
    req.auth = user;
    if (next) return next();
  } catch (error) {
    return res.status(400).send("Invalid token!");
  }
};

module.exports.decodeToken = decodeToken;
