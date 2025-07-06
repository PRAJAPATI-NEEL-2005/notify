const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
const router = express.Router();
var jwt = require("jsonwebtoken");
const fetchuser = require("../Middleware/fetchuser");
const JWT_SECRET = "neelisag$oy";
// @route   POST /
// @desc    Register user
// @access  Public

// ROUTE :1 createuser path : "http://localhost:5000/api/auth/createuser" that is the api for to create user
router.post(
  "/createuser",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Destructure request body
      const { name, email, password } = req.body;

      // existing user check
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: "false", error: "User with this email already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Here, you might want to add user creation logic
      // const user = await User.create({ name, email, password });
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      const data = {
        user: {
          id: newUser._id,
        },
      };
      const jwtdata = jwt.sign(data, JWT_SECRET);

      return res.status(200).json({
        success: true,
        message: "User created successfully",
        jwtdata,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success:"false",error: "Server Error" });
    }
  }
);

//ROUTE :2 loginuser path : "http://localhost:5000/api/auth/loginuser"that is the api for login the user
router.post(
  "/loginuser",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be null").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      //validator used
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //destructuring the data
      const { email, password } = req.body;

      //finding the user exist or not
      let existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res
          .status(400)
          .json({ success:"false", error: "try to login with correct credential" });
      }
      // comparing the password with databse user
      const compare = await bcrypt.compare(password, existingUser.password);
      if (!compare) {
        return res
          .status(400)
          .json({success:"false", error: "try to login with correct credential" });
      }
      // returning the data
      const data = {
        user: {
          id: existingUser._id,
        },
      };
      const jwtdata = jwt.sign(data, JWT_SECRET);
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        jwtdata,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success:"false",error: "Server Error" });
    }
  }
);



router.post(
  "/getuser",fetchuser,async (req, res) => {
try {
   userId=req.user.id;

   const user=await User.findById(userId).select("-password");
   res.send(user);
   
} catch (error) {
     console.error(error.message);
      return res.status(500).json({ error: "Server Error" });
   
}

  })

module.exports = router;
