const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  });

  userSchema.methods.matchPassword = function (enteredPassword) {
  return enteredPassword === this.password;
};


const User = mongoose.model('User', userSchema);
module.exports = User;