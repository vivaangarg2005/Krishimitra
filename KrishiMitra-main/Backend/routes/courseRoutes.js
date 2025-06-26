const express = require("express");
const router = express.Router();
const Course = require("../models/courses");

// Get all courses by category
router.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const courses = await Course.find({ category });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses'  });
  }
});

// Add new course
router.post("/", async (req, res) => {
  const { category, title, description, videoUrl } = req.body;
  const course = new Course({ category, title, description, videoUrl });
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
