const { ROLE } = require("../utils/constant");

module.exports = (req, res, next) => {
  if (req.auth.role !== ROLE.ADMIN)
    return res.status(403).send("Access denied!");

  if (next) return next();
};
