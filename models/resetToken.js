const { hash } = require("bcryptjs");
const mongoose = require("mongoose");

const resetPasswordRequestSchema = mongoose.Schema({
  email: String,
  userName: String,
  hash: String,
});

const resetpassword = mongoose.model(
  "reset-password-request",
  resetPasswordRequestSchema
);

module.exports = resetpassword;
