// components/NetworkAssistant/ContactSearchBar.jsx

import React, { useState, useEffect } from "react";
import { useNetworkAssistant } from "../../contexts/NetworkAssistantContext";

function ContactSearchBar() {
  const { setSearchQuery } = useNetworkAssistant();
  const [input, setInput] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(input);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [input, setSearchQuery]);

  return (
    <div style={{ marginBottom: "12px" }}>
      <input
        type="text"
        placeholder="Search contacts..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Search contacts"
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default ContactSearchBar;
