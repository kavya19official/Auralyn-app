module.exports = (text = "", noiseLevel = 0) => {
  const t = text.toLowerCase();

  // Emotion score buckets
  let scores = {
    calm: 0,
    happy: 0,
    energetic: 0,
    stressed: 0,
    neutral: 0
  };

  // 🔤 Text-based emotion keywords
  const keywordMap = {
    calm: ["relax", "peace", "tired", "sleep", "slow"],
    happy: ["happy", "joy", "excited", "smile", "fun"],
    stressed: ["stress", "anxious", "pressure", "tense"],
    energetic: ["party", "dance", "gym", "hype"]
  };

  // Analyze text
  for (const mood in keywordMap) {
    keywordMap[mood].forEach(word => {
      if (t.includes(word)) scores[mood] += 2;
    });
  }

  // 🔊 Noise-based analysis
  if (noiseLevel > 85) scores.energetic += 3;
  else if (noiseLevel > 60) scores.happy += 2;
  else if (noiseLevel < 30) scores.calm += 2;

  // ⚖️ Stress overrides
  if (scores.stressed >= 3) return "calm";

  // 🎯 Pick highest score
  const detectedMood = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  return detectedMood || "neutral";
};