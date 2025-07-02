// components/NetworkAssistant/ContactDetailView.jsx

import React from "react";
import { useContacts } from "../../contexts/ContactContext";
import { useOutreach } from "../../contexts/OutreachContext";

function ContactDetailView() {
  const { selectedContact, setSelectedContact } = useContacts();
  const { outreachLogs } = useOutreach();

  if (!selectedContact) return null;

  const contactLogs = outreachLogs.filter(
    (log) => log.contactId === selectedContact.id
  );

  return (
    <aside role="dialog" aria-labelledby="contact-detail-heading" style={{
      position: "fixed",
      right: 0,
      top: 0,
      height: "100%",
      width: "300px",
      backgroundColor: "var(--color-surface)",
      borderLeft: "1px solid #ccc",
      padding: "16px",
      overflowY: "auto",
      zIndex: 1000,
    }}>
      <h3 id="contact-detail-heading">{selectedContact.name}</h3>
      <p><strong>Job Title:</strong> {selectedContact.jobTitle}</p>
      <p><strong>Relationship Health:</strong> {selectedContact.relationshipHealth}</p>

      <h4>Outreach History:</h4>
      {contactLogs.length === 0 ? (
        <p>No previous outreaches logged.</p>
      ) : (
        <ul>
          {contactLogs.map((log) => (
            <li key={log.id}>
              {new Date(log.date).toLocaleDateString()}: {log.messageContent.slice(0, 50)}...
            </li>
          ))}
        </ul>
      )}

      <button className="button-secondary" onClick={() => setSelectedContact(null)}>
        Close
      </button>
    </aside>
  );
}

export default React.memo(ContactDetailView);
