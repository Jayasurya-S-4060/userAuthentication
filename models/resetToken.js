const mongoose = require("mongoose");

const resetPasswordRequestSchema = mongoose.Schema({
  email: String,
});

const resetTokenModel = mongoose.model(
  "reset-password-request",
  resetPasswordRequestSchema
);

module.exports = resetTokenModel;
