// Helper functions for ML model management

// Helper function to get emoji for each emotion
export const getEmotionEmoji = (emotion) => {
  const emotionEmojis = {
    happy: "😊",
    sad: "😢",
    angry: "😠",
    surprised: "😲",
    fearful: "😨",
    disgusted: "🤢",
    neutral: "😐",
  }
  return emotionEmojis[emotion] || "😐"
}

// Helper function to get Font Awesome icon class for each emotion
export const getEmotionIcon = (emotion) => {
  const emotionIcons = {
    happy: "fa-face-smile",
    sad: "fa-face-sad-tear",
    angry: "fa-face-angry",
    surprised: "fa-face-surprise",
    fearful: "fa-face-fearful",
    disgusted: "fa-face-dizzy",
    neutral: "fa-face-meh",
  }
  return emotionIcons[emotion] || "fa-face-meh"
}
