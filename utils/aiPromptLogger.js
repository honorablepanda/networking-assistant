// utils/aiPromptLogger.js

export const logAiPrompt = (source, prompt, contextSetter) => {
  contextSetter((prev) => [...prev, { source, prompt }]);
};
