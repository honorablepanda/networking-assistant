// components/NetworkAssistant/ContactImportPanel.jsx

import React, { useState } from "react";
import { useContacts } from "../../contexts/ContactContext";

function ContactImportPanel() {
  const { contacts, setContacts } = useContacts();
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState("");

  const handleImport = () => {
    const lines = inputText.trim().split("\n");
    const newContacts = lines.map((line, idx) => {
      const [name, jobTitle] = line.split(",");
      return {
        id: (contacts.length + idx + 1).toString(),
        name: name?.trim() || `Unnamed ${idx + 1}`,
        jobTitle: jobTitle?.trim() || "Unknown",
        relationshipHealth: "Cold",
      };
    });

    setContacts([...contacts, ...newContacts]);
    setMessage(`${newContacts.length} contacts imported!`);
    setInputText("");
  };

  return (
    <section className="spacing-md">
      <h3>📥 Import Contacts</h3>
      <textarea
        rows={5}
        style={{ width: "100%" }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Name, Job Title\nExample:\nAlice Johnson, Product Manager"
      />
      <button className="button-primary" onClick={handleImport}>Import</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
    </section>
  );
}

export default React.memo(ContactImportPanel);
