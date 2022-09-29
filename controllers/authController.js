const User = require("../models/User");

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    //This is RegExp
    const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const { username, password, email } = req.body;

    // Check for missing fields
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter(s)",
      });
    }

    // Check RegExp password
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must have minimum eight characters, and contains at least one letter and one number",
      });
    }

    // Check RegExp password
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "This email is not valid",
      });
    }

    try {
      //Check if username taken
      const userByUsername = await User.findOne({ username });
      if (userByUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already taken.",
        });
      }

      //Check if email taken
      const userByEmail = await User.findOne({ email });
      if (userByEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already taken.",
        });
      }

      // If all good, hash password
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      // Done created, return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(200).json({
        success: true,
        message: "User created successfully.",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    // Check for missing fields
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter(s)",
      });
    }

    try {
      //Check if username exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Incorrect username.",
        });
      }

      //Check if password matches
      const verifiedPassword = await argon2.verify(user.password, password);

      if (!verifiedPassword) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password.",
        });
      }

      //If all good, return token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(200).json({
        success: true,
        message: "User logged in successfully.",
        accessToken,
        idUser: user._id
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },
};

module.exports = authController;
