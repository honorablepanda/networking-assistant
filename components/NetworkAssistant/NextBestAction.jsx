// components/NetworkAssistant/NextBestAction.jsx

import React, { useEffect, useState } from "react";
import { useContacts } from "../../contexts/ContactContext";
import { useOutreach } from "../../contexts/OutreachContext";
import { useUserPreferences } from "../../contexts/UserPreferencesContext";

function NextBestAction() {
  const { selectedContact, contacts } = useContacts();
  const { outreachLogs, outreachGoal, completedOutreaches } = useOutreach();
  const { userNickname } = useUserPreferences();
  const [suggestedAction, setSuggestedAction] = useState("");

  useEffect(() => {
    if (!selectedContact) {
      setSuggestedAction("");
      return;
    }

    const contactLogs = outreachLogs.filter(
      (log) => log.contactId === selectedContact.id
    );

    const daysSinceLast = contactLogs.length
      ? Math.floor((Date.now() - new Date(contactLogs[0].date)) / (1000 * 60 * 60 * 24))
      : Infinity;

    let action = "Review contact details and plan outreach.";

    if (selectedContact.relationshipHealth === "Cold" && daysSinceLast > 60) {
      action = "Send a re-engagement or apology message. It’s been over 60 days.";
    } else if (selectedContact.relationshipHealth === "Warm") {
      action = "Send a helpful follow-up with value.";
    } else if (selectedContact.relationshipHealth === "Hot") {
      action = "Suggest a meeting or call soon.";

    }

    if (completedOutreaches < outreachGoal) {
      action += ` (${userNickname}, you still need ${outreachGoal - completedOutreaches} outreaches this week!)`;
    }

    setSuggestedAction(action);
  }, [selectedContact, outreachLogs, outreachGoal, completedOutreaches, userNickname]);

  if (!selectedContact) return <p>Select a contact to see next action.</p>;

  return (
    <section aria-labelledby="nba-heading" className="spacing-md">
      <h3 id="nba-heading">🧭 Next Best Action</h3>
      <p>{suggestedAction}</p>
    </section>
  );
}

export default React.memo(NextBestAction);
