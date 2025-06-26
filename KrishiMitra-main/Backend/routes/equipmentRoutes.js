const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// Create equipment booking
router.post('/', async (req, res) => {
  try {
    const newItem = new Equipment(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const all = await Equipment.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load equipment' });
  }
});

module.exports = router;
