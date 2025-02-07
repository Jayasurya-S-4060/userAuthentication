const express = require("express");
const { userRegister, userLogin } = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", auth, userRegister);
router.get("/login", auth, userLogin);

module.exports = router;
