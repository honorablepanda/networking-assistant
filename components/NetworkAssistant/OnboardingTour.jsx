// components/NetworkAssistant/OnboardingTour.jsx

import React, { useState, useEffect } from "react";

const steps = [
  "👋 Welcome to the Networking Assistant! This tour will guide you through key features.",
  "📇 First, check out your Contact List. Click a contact to view details.",
  "🤖 Try generating an AI Outreach Draft using the AI Outreach Wizard.",
  "🎯 Set your weekly outreach goal in the Goal Tracker.",
  "🏅 Earn badges as you complete outreach actions!",
  "✅ Export your outreach history anytime from the History Export Panel.",
  "🌈 You can also toggle between Light and Dark Mode from Settings.",
  "🎉 You're all set! Happy networking!",
];

function OnboardingTour() {
  const [stepIndex, setStepIndex] = useState(0);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const tourCompleted = localStorage.getItem("networkingAssistant_onboardingComplete");
    if (!tourCompleted) {
      setShowTour(true);
    }
  }, []);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setShowTour(false);
      localStorage.setItem("networkingAssistant_onboardingComplete", "true");
    }
  };

  const handleSkip = () => {
    setShowTour(false);
    localStorage.setItem("networkingAssistant_onboardingComplete", "true");
  };

  if (!showTour) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      zIndex: 9999,
      padding: "20px",
      textAlign: "center",
    }}>
      <h2>Onboarding Tour</h2>
      <p style={{ maxWidth: "500px" }}>{steps[stepIndex]}</p>
      <div style={{ marginTop: "12px" }}>
        <button onClick={handleNext} style={{ marginRight: "8px" }}>
          {stepIndex < steps.length - 1 ? "Next" : "Finish"}
        </button>
        <button onClick={handleSkip}>Skip Tour</button>
      </div>
    </div>
  );
}

export default OnboardingTour;
