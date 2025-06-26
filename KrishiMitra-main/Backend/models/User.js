const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  dob: Date,
  aadhar: String,
  username: String,
  password: String,
  phone: String,
  email: String,
  address: String,
  language: String,
  farmingSkill: String,
  otherSkill: String,
  kyf: Boolean,
  landSize: {
    size: Number,
    unit: String
  },
  annualIncome: Number,
  interestedInSchemes: Boolean
});

module.exports = mongoose.model('User', userSchema);
