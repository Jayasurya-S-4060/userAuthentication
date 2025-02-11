const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

const user = mongoose.model("Users", userSchema);

module.exports = user;
