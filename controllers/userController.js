const User = require("../models/user");

// Create a new recipe
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(201)
      .json({ message: "Recipe successfully created", recipe: newRecipe });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating recipe", error: err.message });
  }
};

// Get a single recipe by ID
const userLogin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching recipe", error: err.message });
  }
};

module.exports = {
  createUser,
  userLogin,
};
