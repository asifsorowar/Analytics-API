require("express-async-errors");
if (!process.env.NODE_ENV) {
  require("dotenv").config({ path: "./config/config.env" });
}
