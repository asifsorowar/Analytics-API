const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ROLE } = require("../utils/constant");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: [...Object.keys(ROLE).values()],
      default: "USER",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

UserSchema.methods.getToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "10d",
    }
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid(...Object.keys(ROLE).values()),
  });

  return schema.validate(user);
};

module.exports.validate = validate;
module.exports.User = User;
