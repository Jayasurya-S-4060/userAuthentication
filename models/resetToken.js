const mongoose = require("mongoose");

const resetPasswordRequestSchema = mongoose.Schema({
  email: String,
});

const resetScheme = mongoose.model(
  "reset-password-request",
  resetPasswordRequestSchema
);

module.exports = resetScheme;
