// components/NetworkAssistant/DailyTaskFeed.jsx

import React from "react";
import { useNetworkAssistant } from "../../contexts/NetworkAssistantContext";

function DailyTaskFeed() {
  const { contacts, outreachLogs } = useNetworkAssistant();

  const todayISO = new Date().toISOString().slice(0, 10);

  const suggestedContacts = contacts.filter((contact) => {
    const hasContactToday = outreachLogs.some(
      (log) =>
        log.contactId === contact.id &&
        log.date.slice(0, 10) === todayISO
    );
    return !hasContactToday && (contact.relationshipHealth !== "Hot" || true);
  });

  return (
    <div style={{ marginTop: "20px", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h3>📋 Today's Top Contacts</h3>
      {suggestedContacts.length === 0 ? (
        <p>✅ You’ve contacted everyone for today!</p>
      ) : (
        <ul>
          {suggestedContacts.slice(0, 5).map((contact) => (
            <li key={contact.id}>
              {contact.name} – {contact.jobTitle} –{" "}
              <strong style={{ color: contact.relationshipHealth === "Hot" ? "green" : contact.relationshipHealth === "Cold" ? "red" : "orange" }}>
                {contact.relationshipHealth}
              </strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DailyTaskFeed;
