// components/NetworkAssistant/Badges.jsx

import React from "react";
import { useOutreach } from "../../contexts/OutreachContext";

const badgeDescriptions = {
  "Goal Crusher": "Hit your weekly outreach goal!",
  "Consistency Champion": "Maintained a 5-day outreach streak!",
  "Cold Contact Recovery Pro": "Reached out to 3 cold contacts!",
};

function Badges() {
  const { badges } = useOutreach();

  if (!badges || badges.length === 0) return null;

  return (
    <section aria-labelledby="badges-heading" className="spacing-md">
      <h3 id="badges-heading">🏅 Your Badges</h3>
      <ul>
        {badges.map((badge) => (
          <li key={badge}><strong>{badge}:</strong> {badgeDescriptions[badge] || ""}</li>
        ))}
      </ul>
    </section>
  );
}

export default React.memo(Badges);
