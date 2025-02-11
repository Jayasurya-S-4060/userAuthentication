const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

const resetPasswordRequestSchema = mongoose.Schema({
  email: String,
});

const user = mongoose.model("Users", userSchema);
const resetRequest = mongoose.model(
  "reset-password-request",
  resetPasswordRequestSchema
);

module.exports = user;
