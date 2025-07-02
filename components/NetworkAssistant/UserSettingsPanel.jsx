// components/NetworkAssistant/UserSettingsPanel.jsx

import React from "react";
import { useUserPreferences } from "../../contexts/UserPreferencesContext";
import { useOutreach } from "../../contexts/OutreachContext";
import { useTheme } from "../../contexts/ThemeContext";

function UserSettingsPanel() {
  const { userNickname, setUserNickname } = useUserPreferences();
  const { outreachGoal, setOutreachGoal } = useOutreach();
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="spacing-md">
      <h3>⚙️ User Settings</h3>

      <div className="spacing-sm">
        <label>Nickname:</label><br />
        <input
          type="text"
          value={userNickname}
          onChange={(e) => setUserNickname(e.target.value)}
        />
      </div>

      <div className="spacing-sm">
        <label>Weekly Outreach Goal:</label><br />
        <input
          type="number"
          value={outreachGoal}
          onChange={(e) => setOutreachGoal(parseInt(e.target.value, 10) || 0)}
        />
      </div>

      <button className="button-primary" onClick={toggleTheme}>
        Toggle Theme (Current: {theme})
      </button>
    </section>
  );
}

export default React.memo(UserSettingsPanel);
