// utils/localNLP.js

export function simpleSentimentAnalysis(text) {
  const lowerText = text.toLowerCase();

  const positiveWords = ["great", "thank", "happy", "good", "excited", "awesome"];
  const negativeWords = ["sorry", "unfortunately", "problem", "issue", "bad"];

  let score = 0;

  positiveWords.forEach((word) => {
    if (lowerText.includes(word)) score += 1;
  });

  negativeWords.forEach((word) => {
    if (lowerText.includes(word)) score -= 1;
  });

  if (score > 0) return "Positive";
  if (score < 0) return "Negative";
  return "Neutral";
}

export function extractTopicTags(text) {
  const tags = [];

  const topicKeywords = {
    jobSearch: ["resume", "interview", "application", "career"],
    networking: ["connect", "network", "coffee", "chat"],
    updates: ["update", "news", "announcement", "project"],
  };

  const lowerText = text.toLowerCase();

  Object.entries(topicKeywords).forEach(([tag, keywords]) => {
    keywords.forEach((word) => {
      if (lowerText.includes(word) && !tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  return tags.length > 0 ? tags : ["general"];
}
