const mongoose = require("mongoose");

const resetPasswordRequestSchema = mongoose.Schema({
  email: String,
});

const resetpassword = mongoose.model(
  "reset-password-request",
  resetPasswordRequestSchema
);

module.exports = resetpassword;
