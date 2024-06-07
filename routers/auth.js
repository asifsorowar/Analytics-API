const express = require("express");
const router = express.Router();

const { User } = require("../models/User");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

router.get("/me", [auth], async (req, res) => {
  const user = await User.findOne({ _id: req.auth._id }).select("-password");
  return res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body?.email });
  if (!user) return res.status(400).send("user not found!!");

  const verified = await bcrypt.compare(req.body.password, user.password);
  if (!verified) return res.status(400).send("email or password is invalid!!");

  const token = user.getToken();
  return res.status(200).send(token);
});

module.exports = router;
