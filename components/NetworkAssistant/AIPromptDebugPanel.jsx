// components/NetworkAssistant/AIPromptDebugPanel.jsx

import React from "react";
import { useNetworkAssistant } from "../../contexts/NetworkAssistantContext";

function AIPromptDebugPanel() {
  const { aiPromptLogs } = useNetworkAssistant();

  if (aiPromptLogs.length === 0) return null;

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f0f0f0",
        maxHeight: "300px",
        overflowY: "scroll",
        fontSize: "12px",
      }}
    >
      <h3>🛠️ AI Prompt Debug Panel</h3>
      {aiPromptLogs.map((entry, idx) => (
        <div key={idx} style={{ marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px dashed #ccc" }}>
          <strong>Source:</strong> {entry.source}<br />
          <pre style={{ whiteSpace: "pre-wrap" }}>{entry.prompt}</pre>
        </div>
      ))}
    </div>
  );
}

export default AIPromptDebugPanel;
