const express = require("express");
const { userRegister, userLogin } = require("../controllers/userController");
const { registerAuth, loginAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerAuth, userRegister);
router.get("/login", loginAuth, userLogin);

module.exports = router;
