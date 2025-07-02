// components/NetworkAssistant/RelationshipHealthMeter.jsx

import React from "react";

function RelationshipHealthMeter({ health }) {
  let color = "#999";
  let label = "Unknown";

  if (health === "Cold") {
    color = "#00BFFF"; // Blue
    label = "Cold";
  } else if (health === "Warm") {
    color = "#FFA500"; // Orange
    label = "Warm";
  } else if (health === "Hot") {
    color = "#FF4500"; // Red-Orange
    label = "Hot";
  }

  return (
    <div
      style={{
        display: "inline-block",
        padding: "4px 8px",
        borderRadius: "12px",
        backgroundColor: color,
        color: "#fff",
        fontSize: "12px",
      }}
    >
      {label}
    </div>
  );
}

export default RelationshipHealthMeter;
