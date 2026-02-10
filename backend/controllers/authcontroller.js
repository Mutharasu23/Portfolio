const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */

exports.register = async (req, res) => {

  const { email, password } = req.body;

  try {

    // Check existing user
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashPassword
    });

    await user.save();

    res.status(201).json({
      msg: "Registration successful"
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ msg: "Server error" });

  }
};


/* ================= LOGIN ================= */

exports.login = async (req, res) => {

  const { email, password } = req.body;

  try {

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ msg: "Server error" });

  }
};
