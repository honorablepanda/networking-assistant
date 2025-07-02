// contexts/NetworkAssistantContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import mockContacts from "../utils/mockContacts";
import { calculateRelationshipHealth } from "../utils/scoringUtils";

const NetworkAssistantContext = createContext();

export function NetworkAssistantProvider({ children }) {
  const [contacts, setContacts] = useState(mockContacts);
  const [selectedContact, setSelectedContact] = useState(null);

  const [outreachLogs, setOutreachLogs] = useState(() => {
    const savedLogs = localStorage.getItem("networkingAssistant_outreachLogs");
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  const [outreachGoal, setOutreachGoal] = useState(() => {
    const saved = localStorage.getItem("networkingAssistant_outreachGoal");
    return saved ? parseInt(saved, 10) : 5;
  });

  const [completedOutreaches, setCompletedOutreaches] = useState(() => {
    const saved = localStorage.getItem("networkingAssistant_completedOutreaches");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [selectedTone, setSelectedTone] = useState("Neutral");

  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [outreachStreak, setOutreachStreak] = useState(() => {
    const saved = localStorage.getItem("networkingAssistant_outreachStreak");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem("networkingAssistant_badges");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [aiPromptLogs, setAiPromptLogs] = useState([]);

  // ✅ New: Theme and User Nickname State
  const [theme, setTheme] = useState(() => localStorage.getItem("networkingAssistant_theme") || "light");
  const [userNickname, setUserNickname] = useState(() => localStorage.getItem("networkingAssistant_nickname") || "User");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("networkingAssistant_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("networkingAssistant_nickname", userNickname);
  }, [userNickname]);

  const logAiPrompt = (source, prompt) => {
    setAiPromptLogs((prev) => [...prev, { source, prompt }]);
  };

  useEffect(() => {
    localStorage.setItem("networkingAssistant_badges", JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem(
      "networkingAssistant_outreachLogs",
      JSON.stringify(outreachLogs)
    );
  }, [outreachLogs]);

  useEffect(() => {
    localStorage.setItem(
      "networkingAssistant_outreachGoal",
      outreachGoal.toString()
    );
  }, [outreachGoal]);

  useEffect(() => {
    localStorage.setItem(
      "networkingAssistant_completedOutreaches",
      completedOutreaches.toString()
    );
  }, [completedOutreaches]);

  useEffect(() => {
    localStorage.setItem(
      "networkingAssistant_outreachStreak",
      outreachStreak.toString()
    );
  }, [outreachStreak]);

  const updateContactHealth = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) => {
        if (contact.id !== contactId) return contact;

        const contactLogs = outreachLogs.filter(
          (log) => log.contactId === contactId
        );

        const lastLog = contactLogs.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )[0];

        const newHealth = calculateRelationshipHealth(lastLog?.date);
        return { ...contact, relationshipHealth: newHealth };
      })
    );
  };

  const recalculateAllContactHealth = () => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) => {
        const contactLogs = outreachLogs.filter(
          (log) => log.contactId === contact.id
        );

        const lastLog = contactLogs.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )[0];

        const newHealth = calculateRelationshipHealth(lastLog?.date);
        return { ...contact, relationshipHealth: newHealth };
      })
    );
  };

  useEffect(() => {
    recalculateAllContactHealth();
  }, []);

  const registerActivity = () => {
    setLastActivityTime(Date.now());
  };

  const unlockBadge = (badgeName) => {
    if (!badges.includes(badgeName)) {
      setBadges((prev) => [...prev, badgeName]);
    }
  };

  const coldOutreachCount = outreachLogs.filter((log) => {
    const contact = contacts.find((c) => c.id === log.contactId);
    return contact?.relationshipHealth === "Cold";
  }).length;

  const logOutreach = (contactId, messageContent) => {
    const newLog = {
      id: Date.now().toString(),
      contactId,
      messageContent,
      date: new Date().toISOString(),
    };

    setOutreachLogs((prev) => [...prev, newLog]);
    setCompletedOutreaches((count) => count + 1);
    updateContactHealth(contactId);

    const now = new Date();
    const lastDate = new Date(lastActivityTime);
    const daysGap = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

    if (daysGap <= 1) {
      setOutreachStreak((prev) => prev + 1);
    } else {
      setOutreachStreak(1);
    }

    setLastActivityTime(now.getTime());

    if (completedOutreaches + 1 === outreachGoal) {
      unlockBadge("Goal Crusher");
    }

    if (outreachStreak >= 5) {
      unlockBadge("Consistency Champion");
    }

    if (coldOutreachCount >= 3) {
      unlockBadge("Cold Contact Recovery Pro");
    }

    setContacts((prevContacts) =>
      prevContacts.map((contact) => {
        if (contact.id !== contactId) return contact;

        const newMemory = contact.lastConversationSnippet
          ? `${contact.lastConversationSnippet} | ${messageContent.slice(0, 50)}...`
          : messageContent.slice(0, 50) + "...";

        return {
          ...contact,
          lastConversationSnippet: newMemory,
        };
      })
    );
  };

  const resetAllData = () => {
    localStorage.removeItem("networkingAssistant_outreachLogs");
    localStorage.removeItem("networkingAssistant_outreachGoal");
    localStorage.removeItem("networkingAssistant_completedOutreaches");
    localStorage.removeItem("networkingAssistant_outreachStreak");
    localStorage.removeItem("networkingAssistant_badges");
    localStorage.removeItem("networkingAssistant_theme");
    localStorage.removeItem("networkingAssistant_nickname");

    setOutreachLogs([]);
    setOutreachGoal(5);
    setCompletedOutreaches(0);
    setOutreachStreak(0);
    setBadges([]);
    setContacts(mockContacts);
    setSelectedContact(null);
    setSearchQuery("");
    setAiPromptLogs([]);
    setTheme("light");
    setUserNickname("User");
  };

  const value = {
    contacts,
    setContacts,
    selectedContact,
    setSelectedContact,
    outreachLogs,
    logOutreach,
    outreachGoal,
    setOutreachGoal,
    completedOutreaches,
    selectedTone,
    setSelectedTone,
    resetAllData,
    registerActivity,
    lastActivityTime,
    outreachStreak,
    badges,
    unlockBadge,
    coldOutreachCount,
    searchQuery,
    setSearchQuery,
    aiPromptLogs,
    logAiPrompt,
    theme,
    toggleTheme,
    userNickname,
    setUserNickname,
  };

  return (
    <NetworkAssistantContext.Provider value={value}>
      {children}
    </NetworkAssistantContext.Provider>
  );
}

export function useNetworkAssistant() {
  return useContext(NetworkAssistantContext);
}
