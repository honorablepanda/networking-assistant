// utils/scoringUtils.js

export function calculateRelationshipHealth(lastContactDate) {
  if (!lastContactDate) return "Cold";

  const now = new Date();
  const lastDate = new Date(lastContactDate);
  const daysSinceContact = Math.floor(
    (now - lastDate) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceContact <= 7) {
    return "Hot";
  } else if (daysSinceContact <= 30) {
    return "Warm";
  } else {
    return "Cold";
  }
}
