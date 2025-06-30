const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../Models/Users');
const bcrypt = require('bcryptjs');
const router = express.Router();
var jwt = require('jsonwebtoken');
const JWT_SECRET='neelisag$oy';
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
      
         // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Here, you might want to add user creation logic
      // const user = await User.create({ name, email, password });
       const newUser = new User({
        name:name,
        email:email,
        password:hashedPassword
      });
      await newUser.save();
const data={
   user:{
      id:newUser._id
   }
}
const jwtdata=jwt.sign(data,JWT_SECRET);

      return res.status(200).json({
         success: true,
        message: 'User created successfully',
        jwtdata
        
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server Error' });
    }
  }
);

module.exports = router;
