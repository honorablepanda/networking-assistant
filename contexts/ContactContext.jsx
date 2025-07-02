// contexts/ContactContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import mockContacts from "../utils/mockContacts";

const ContactContext = createContext();

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState(mockContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ContactContext.Provider
      value={{
        contacts,
        setContacts,
        selectedContact,
        setSelectedContact,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactContext);
}
