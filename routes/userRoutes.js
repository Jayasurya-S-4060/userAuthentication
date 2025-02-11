const express = require("express");
const {
  userRegister,
  userLogin,
  getUserInfo,
  resetPasswordRequest,
} = require("../controllers/userController");
const {
  registerAuth,
  loginAuth,
  verifyToken,
  resetPasswordAuthRequest,
} = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerAuth, userRegister);
router.post("/reset-password", resetPasswordAuthRequest, resetPasswordRequest);
router.post("/login", loginAuth, userLogin);
router.get("/user", verifyToken, getUserInfo);

module.exports = router;
