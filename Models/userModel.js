const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phone_number: Number
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
