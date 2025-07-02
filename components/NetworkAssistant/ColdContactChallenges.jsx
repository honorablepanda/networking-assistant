// components/NetworkAssistant/ColdContactChallenges.jsx

import React from "react";
import { useNetworkAssistant } from "../../contexts/NetworkAssistantContext";

function ColdContactChallenges() {
  const { coldOutreachCount } = useNetworkAssistant();

  return (
    <div style={{ marginTop: "20px", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff0f0" }}>
      <h3>❄️ Cold Contact Recovery Challenge</h3>
      <p>Goal: Reach out to at least 3 cold contacts.</p>
      <p>Progress: {coldOutreachCount} / 3 completed.</p>
      {coldOutreachCount >= 3 && <p style={{ color: "green" }}>✅ Challenge Completed!</p>}
    </div>
  );
}

export default ColdContactChallenges;
