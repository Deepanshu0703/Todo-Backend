const User = require('../Models/userModel');
const authService = require('../services/authenticationService');

// Controller to handle user registration
exports.register = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const user = await User.create({ phone_number });
    const token = authService.generateToken(user._id);
    res.status(201).json({ success: true, message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to handle user login
exports.login = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const data= await User.findOne({ phone_number });
    if (!data) {
      return res.status(404).json({ error: 'User not found' });
    }
    const token = authService.generateToken(data._id);
    res.status(200).json({ success: true, message: 'User logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to handle user logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
