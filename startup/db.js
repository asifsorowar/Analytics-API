const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("mongodb is connected....."))
    .catch(() => console.log("could not connected to mongodb....."));
};

connectDB();
