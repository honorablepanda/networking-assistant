// components/NetworkAssistant/AIMessageToneSelector.jsx

import React from "react";
import { useNetworkAssistant } from "../../contexts/NetworkAssistantContext";

function AIMessageToneSelector() {
  const { selectedTone, setSelectedTone } = useNetworkAssistant();

  const handleChange = (e) => {
    setSelectedTone(e.target.value);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fefefe",
      }}
    >
      <h3>Select Message Tone</h3>
      <select value={selectedTone} onChange={handleChange}>
        <option value="Neutral">Neutral</option>
        <option value="Friendly">Friendly</option>
        <option value="Professional">Professional</option>
        <option value="Casual">Casual</option>
        <option value="Empathetic">Empathetic</option>
      </select>
      <p style={{ fontSize: "12px", color: "#666", marginTop: "6px" }}>
        Current Tone: <strong>{selectedTone}</strong>
      </p>
    </div>
  );
}

export default AIMessageToneSelector;
