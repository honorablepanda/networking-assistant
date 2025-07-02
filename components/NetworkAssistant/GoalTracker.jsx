// components/NetworkAssistant/GoalTracker.jsx

import React, { useEffect, useState } from "react";
import { useOutreach } from "../../contexts/OutreachContext";
import { useUserPreferences } from "../../contexts/UserPreferencesContext";
import CelebrationOverlay from "./CelebrationOverlay";

function GoalTracker() {
  const { outreachGoal, completedOutreaches, setOutreachGoal } = useOutreach();
  const { userNickname } = useUserPreferences();

  const [showCelebration, setShowCelebration] = useState(false);

  const progressPercent = outreachGoal > 0
    ? Math.min((completedOutreaches / outreachGoal) * 100, 100)
    : 0;

  useEffect(() => {
    if (completedOutreaches >= outreachGoal && outreachGoal > 0) {
      setShowCelebration(true);
    }
  }, [completedOutreaches, outreachGoal]);

  return (
    <section aria-labelledby="goal-tracker-heading" className="spacing-md" role="region">
      <h3 id="goal-tracker-heading">🎯 {userNickname}'s Weekly Outreach Goal</h3>
      <p>Goal: {outreachGoal} outreaches</p>
      <p>Completed: {completedOutreaches} / {outreachGoal}</p>

      <div style={{
        background: "var(--color-surface)",
        borderRadius: "8px",
        height: "12px",
        width: "100%",
        marginBottom: "8px",
      }}>
        <div style={{
          background: "var(--color-success)",
          height: "12px",
          borderRadius: "8px",
          width: `${progressPercent}%`,
          transition: "width 0.3s ease-in-out",
        }} />
      </div>

      <label htmlFor="goalInput">Update Goal:</label><br />
      <input
        id="goalInput"
        type="number"
        value={outreachGoal}
        onChange={(e) => setOutreachGoal(parseInt(e.target.value, 10) || 0)}
        style={{ width: "60px", marginTop: "4px" }}
      />

      {showCelebration && (
        <CelebrationOverlay onComplete={() => setShowCelebration(false)} />
      )}
    </section>
  );
}

export default React.memo(GoalTracker);
