const User = require("../models/user");

// Create a new recipe
const userRegister = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(201)
      .json({ message: " User successfully Registered", recipe: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while Registering", error: err.message });
  }
};

// Get a single recipe by ID
const userLogin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res
        .status(200)
        .json({ message: " User successfully Login", recipe: user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
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
