const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const resetpassword = require("../models/resetToken");
const nodemailer = require("nodemailer");

// Create a new User
const userRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({ userName, email, password: hash });

    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json({
      message: "User successfully registered",
      user: userWithoutPassword,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while registering", error: err.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordSame = bcrypt.compareSync(password, user.password);
    if (!isPasswordSame) {
      return res
        .status(400)
        .json({ message: "Username/password is incorrect" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({
      message: "User successfully logged in",
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "User info retrieved successfully", user: req.user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user info", error: err.message });
  }
};

const resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { userName } = user;
    const JWT_SECRET = process.env.JWT_SECRET;

    const resetToken = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const createRequest = new resetpassword({ email });

    await createRequest.save();

    // process.env.client_url

    const resetLink = `http://localhost:5173/confirm-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.admin_mail,
        pass: process.env.mail_password,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_MAIL,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Hello ${userName},</p>
             <p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>
             <p>This link will expire in 1 hour.</p>
             <p>If you did not request this, please ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Password reset email sent successfully",
      resetLink,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUserInfo,
  resetPasswordRequest,
};
