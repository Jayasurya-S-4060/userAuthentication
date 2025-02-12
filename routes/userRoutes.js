const express = require("express");
const {
  userRegister,
  userLogin,
  getUserInfo,
  resetPassword,
  resetPasswordRequest,
} = require("../controllers/userController");
const {
  registerAuth,
  loginAuth,
  verifyToken,
  resetPasswordAuthRequest,
  resetPasswordAuth,
} = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerAuth, userRegister);
router.post("/reset-password", resetPasswordAuth, resetPassword);
router.post(
  "/reset-password-request",
  resetPasswordAuthRequest,
  resetPasswordRequest
);
router.post("/login", loginAuth, userLogin);
router.get("/user", verifyToken, getUserInfo);

module.exports = router;
