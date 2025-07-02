// utils/buildNetworkingPrompt.js

export function buildNetworkingPrompt({ contact, tone, userDraft, relationshipHealth }) {
  let basePrompt = `Compose a ${tone} LinkedIn outreach message to ${contact.name}, who is currently a ${contact.jobTitle}.`;

  if (relationshipHealth === "Cold") {
    basePrompt += " The message should re-establish the relationship and reference that it's been a while since last contact.";
  } else if (relationshipHealth === "Warm") {
    basePrompt += " The message should build on recent interactions and provide value.";
  } else if (relationshipHealth === "Hot") {
    basePrompt += " The message should encourage immediate engagement or propose a meeting.";
  }

  if (userDraft) {
    basePrompt += `\n\nHere is the user's draft to improve and rewrite:\n"${userDraft}"`;
  }

  basePrompt += "\n\nKeep the tone consistent and avoid being overly formal.";

  return basePrompt;
}
