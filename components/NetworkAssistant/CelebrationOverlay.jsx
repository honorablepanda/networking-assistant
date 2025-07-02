// components/NetworkAssistant/CelebrationOverlay.jsx

import React, { useEffect } from "react";

function CelebrationOverlay({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
        zIndex: 9999,
      }}
    >
      🎉 Congrats! Goal Achieved! 🎉
    </div>
  );
}

export default CelebrationOverlay;
