const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., 'technical', 'computer'
  title: { type: String, required: true },
  description: String,
  videoUrl: String,
});

module.exports = mongoose.model("Course", courseSchema);
