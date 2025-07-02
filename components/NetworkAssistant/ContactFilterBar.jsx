// components/NetworkAssistant/ContactFilterBar.jsx

import React, { useState } from "react";
import { useNetworkAssistant } from "../../contexts/NetworkAssistantContext";
import mockContacts from "../../utils/mockContacts";

function ContactFilterBar() {
  const { setContacts, outreachLogs } = useNetworkAssistant();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const calculateDaysSince = (dateStr) => {
    if (!dateStr) return Infinity;
    const now = new Date();
    const date = new Date(dateStr);
    return Math.floor((now - date) / (1000 * 60 * 60 * 24));
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    if (filter === "All") {
      setContacts(mockContacts);
    } else if (["Cold", "Warm", "Hot"].includes(filter)) {
      const filtered = mockContacts.filter(
        (contact) => contact.relationshipHealth === filter
      );
      setContacts(filtered);
    } else if (filter === "Overdue") {
      const overdueContacts = mockContacts.filter((contact) => {
        const daysSince = calculateDaysSince(contact.lastContacted);
        return contact.relationshipHealth === "Cold" && daysSince > 30;
      });
      setContacts(overdueContacts);
    }
  };

  const filterOptions = ["All", "Cold", "Warm", "Hot", "Overdue"];

  return (
    <div style={{ marginBottom: "16px" }}>
      <span>Filter by: </span>
      {filterOptions.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterChange(filter)}
          style={{
            margin: "0 4px",
            padding: "6px 10px",
            backgroundColor: selectedFilter === filter ? "#007bff" : "#f0f0f0",
            color: selectedFilter === filter ? "#fff" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default ContactFilterBar;
