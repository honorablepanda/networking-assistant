// components/NetworkAssistant/EngagementTimeline.jsx

import React from "react";
import { useContacts } from "../../contexts/ContactContext";
import { useOutreach } from "../../contexts/OutreachContext";

function EngagementTimeline() {
  const { selectedContact } = useContacts();
  const { outreachLogs } = useOutreach();

  if (!selectedContact) {
    return <p>Select a contact to view engagement history.</p>;
  }

  const contactLogs = outreachLogs
    .filter((log) => log.contactId === selectedContact.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section aria-labelledby="engagement-timeline-heading" className="spacing-md">
      <h3 id="engagement-timeline-heading">🕑 Engagement Timeline</h3>
      {contactLogs.length === 0 ? (
        <p>No outreach history for this contact.</p>
      ) : (
        <ul>
          {contactLogs.map((log) => (
            <li key={log.id}>
              <strong>{new Date(log.date).toLocaleDateString()}:</strong><br />
              {log.messageContent.slice(0, 100)}...
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default React.memo(EngagementTimeline);
