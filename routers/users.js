const express = require("express");
const { User, validate } = require("../models/User");
const router = express.Router();
const { ROLE } = require("../utils/constant");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (value?.role === ROLE.ADMIN) {
    auth(req, res);
    admin(req, res);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already existed!");

  user = new User(req.body);
  await user.save();

  return res.status(201).send({
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
