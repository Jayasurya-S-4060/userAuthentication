const express = require("express");
const { createUser, userLogin } = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signUp", auth, createUser);
router.get("/user/:id", auth, userLogin);

module.exports = router;
