const express = require('express');
const router = express.Router();
const analyzeMood = require('../services/moodAnalyzer');

router.post('/detect', (req, res) => {
  const { text, noiseLevel } = req.body;

  const mood = analyzeMood(text, noiseLevel);

  res.json({
    success: true,
    detectedMood: mood
  });
});

module.exports = router;