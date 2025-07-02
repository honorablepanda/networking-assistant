// components/NetworkAssistant/ContactAnalyticsPanel.jsx

import React from "react";
import { useOutreach } from "../../contexts/OutreachContext";
import { useContacts } from "../../contexts/ContactContext";

function ContactAnalyticsPanel() {
  const { outreachLogs } = useOutreach();
  const { contacts } = useContacts();

  const healthStats = contacts.reduce((acc, contact) => {
    const count = outreachLogs.filter((log) => log.contactId === contact.id).length;
    acc[contact.relationshipHealth] = (acc[contact.relationshipHealth] || 0) + count;
    return acc;
  }, {});

  return (
    <section className="spacing-md">
      <h3>📈 Outreach Analytics</h3>
      {Object.entries(healthStats).map(([health, count]) => (
        <p key={health}><strong>{health} Contacts:</strong> {count} outreaches</p>
      ))}
      {outreachLogs.length === 0 && <p>No outreach data yet.</p>}
    </section>
  );
}

export default React.memo(ContactAnalyticsPanel);
