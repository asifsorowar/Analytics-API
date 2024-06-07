const bcrypt = require("bcrypt");

module.exports = {
  async up(db, client) {
    let password = "Password@1";
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    await db.collection("users").insertMany([
      { name: "Admin", email: "admin@gmail.com", password },
      { name: "user one", email: "user_1@gmail.com", password },
      { name: "user two", email: "user_2@gmail.com", password },
      { name: "user three", email: "user_3@gmail.com", password },
      { name: "user four", email: "user_4@gmail.com", password },
    ]);
  },

  async down(db, client) {
    await db.collection("users").deleteMany({
      email: {
        $in: [
          "admin@gmail.com",
          "user_1@gmail.com",
          "user_2@gmail.com",
          "user_3@gmail.com",
          "user_4@gmail.com",
        ],
      },
    });
  },
};
