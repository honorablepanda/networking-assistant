// components/NetworkAssistant/ContactList.jsx

import React, { useMemo } from "react";
import { useContacts } from "../../contexts/ContactContext";
import ContactCard from "./ContactCard";

function ContactList() {
  const { contacts, searchQuery } = useContacts();

  const filteredAndSortedContacts = useMemo(() => {
    const filtered = contacts.filter((contact) =>
      [contact.name, contact.jobTitle, ...(contact.topInterests || [])]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    const healthPriority = { Hot: 0, Warm: 1, Cold: 2 };
    return filtered.sort((a, b) => {
      const healthDiff = (healthPriority[a.relationshipHealth] || 3) - (healthPriority[b.relationshipHealth] || 3);
      return healthDiff !== 0 ? healthDiff : 0;
    });
  }, [contacts, searchQuery]);

  if (filteredAndSortedContacts.length === 0) {
    return (
      <p role="alert" style={{ fontStyle: "italic", color: "var(--color-muted)" }}>
        No contacts found. Try changing your filter or search query!
      </p>
    );
  }

  return (
    <section aria-labelledby="contact-list-heading" className="spacing-md">
      <h3 id="contact-list-heading">📇 Your Contacts</h3>
      {filteredAndSortedContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </section>
  );
}

export default React.memo(ContactList);
