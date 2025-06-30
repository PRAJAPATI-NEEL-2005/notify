const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../Models/Users');

const router = express.Router();

// @route   POST /
// @desc    Register user
// @access  Public
router.post(
  '/createuser',
  [
    body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
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
         console.log(
            "user already exist"
         )
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      // Log request body
      console.log({ name, email, password });

      // Here, you might want to add user creation logic
      // const user = await User.create({ name, email, password });
       const newUser = new User({
        name,
        email,
        password
      });
      await newUser.save();

      return res.status(200).json({
        newUser
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server Error' });
    }
  }
);

module.exports = router;
