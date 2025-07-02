// contexts/AIPromptLogContext.jsx

import React, { createContext, useContext, useState } from "react";

const AIPromptLogContext = createContext();

export function AIPromptLogProvider({ children }) {
  const [aiPromptLogs, setAiPromptLogs] = useState([]);

  const logAiPrompt = (source, prompt) => {
    setAiPromptLogs((prev) => [...prev, { source, prompt }]);
  };

  return (
    <AIPromptLogContext.Provider value={{ aiPromptLogs, logAiPrompt }}>
      {children}
    </AIPromptLogContext.Provider>
  );
}

export function useAIPromptLog() {
  return useContext(AIPromptLogContext);
}
