const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

//Protect routes

const protect = async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    if (!token) {
      return res.status(401).json({ error: 'No token found' });
    }
  
    try {
      const decoded = jwt.verify(token, "hSSVDJHABHFJBAJDBjsdhsksdbmsd"); 
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
  

const generateToken = (userId) => {
// Generate your token as needed
    const token = jwt.sign({ id: userId }, "hSSVDJHABHFJBAJDBjsdhsksdbmsd", { expiresIn: '7d' });
    return token;
};

module.exports = {
    generateToken,
    protect
};



