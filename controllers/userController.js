const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a new User
const userRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({ userName, email, password: hash });

    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return res
      .status(201)
      .json({
        message: "User successfully registered",
        user: userWithoutPassword,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while registering", error: err.message });
  }
};

// User login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
      return res
        .status(400)
        .json({ message: "Username/password is incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "User successfully logged in",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
};
