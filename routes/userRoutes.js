const express = require("express");
const {
  userRegister,
  userLogin,
  getUserInfo,
} = require("../controllers/userController");
const { registerAuth, loginAuth, verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerAuth, userRegister);
router.get("/login", loginAuth, userLogin);
router.get("/user", verifyToken, getUserInfo);

module.exports = router;
