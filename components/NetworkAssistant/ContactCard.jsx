// components/NetworkAssistant/ContactCard.jsx

import React from "react";
import { useContacts } from "../../contexts/ContactContext";
import RelationshipHealthMeter from "./RelationshipHealthMeter";

function ContactCard({ contact }) {
  const { setSelectedContact } = useContacts();

  const handleSelect = () => setSelectedContact(contact);

  const daysSinceLastContact = contact.lastContacted
    ? Math.floor((Date.now() - new Date(contact.lastContacted)) / (1000 * 60 * 60 * 24))
    : Infinity;

  const isOverdue = contact.relationshipHealth === "Cold" && daysSinceLastContact > 30;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={(e) => e.key === "Enter" && handleSelect()}
      style={{
        border: isOverdue ? "2px solid var(--color-danger)" : "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "8px",
        backgroundColor: "var(--color-surface)",
        cursor: "pointer",
      }}
    >
      <h4>{contact.name}</h4>
      <p>{contact.jobTitle}</p>
      <RelationshipHealthMeter health={contact.relationshipHealth} />
      {isOverdue && <p className="error-message">⚠️ Overdue: No outreach in 30+ days!</p>}
    </article>
  );
}

export default React.memo(ContactCard);
