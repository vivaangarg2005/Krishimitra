const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: String,
  equipment: String,
  availableFrom: Date,
  duration: Number,
  notes: String
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
