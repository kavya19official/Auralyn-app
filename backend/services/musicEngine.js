const songs = require('../data/songs.json');

module.exports = ({ mood, mode, energy }) => {
  let playlist = [];
  let explanation = [];

  // 🎭 Mood-based selection
  if (songs[mood]) {
    playlist = [...songs[mood]];
    explanation.push(`Selected songs matching ${mood} mood`);
  } else {
    playlist = [...songs.neutral];
    explanation.push("Fallback to neutral mood");
  }

  // 🧑‍🤝‍🧑 Mode adjustments
  if (mode === "social") {
    playlist = playlist.filter(song =>
      song.energy !== "low"
    );
    explanation.push("Boosted tempo for social environment");
  }

  if (mode === "wellness") {
    playlist = playlist.filter(song =>
      song.energy === "low"
    );
    explanation.push("Filtered calming tracks for wellness");
  }

  if (mode === "business") {
    playlist = playlist.filter(song =>
      song.instrumental === true
    );
    explanation.push("Selected ambient instrumental music");
  }

  // ⚡ Energy tuning
  playlist = playlist.filter(song => song.energy === energy);
  explanation.push(`Adjusted playlist to ${energy} energy`);

  // 🎯 Fallback safety
  if (playlist.length === 0) {
    playlist = songs.neutral;
    explanation.push("No exact match, fallback applied");
  }

  return {
    playlist,
    explanation
  };
};