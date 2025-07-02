// contexts/OutreachContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

const OutreachContext = createContext();

export function OutreachProvider({ children }) {
  const [outreachLogs, setOutreachLogs] = useState(() => {
    const saved = localStorage.getItem("outreachLogs");
    return saved ? JSON.parse(saved) : [];
  });

  const [outreachGoal, setOutreachGoal] = useState(() => {
    const saved = localStorage.getItem("outreachGoal");
    return saved ? parseInt(saved, 10) : 5;
  });

  const [completedOutreaches, setCompletedOutreaches] = useState(() => {
    const saved = localStorage.getItem("completedOutreaches");
    return saved ? parseInt(saved, 10) : 0;
  });

  const logOutreach = (contactId, messageContent) => {
    const newLog = {
      id: Date.now().toString(),
      contactId,
      messageContent,
      date: new Date().toISOString(),
    };

    setOutreachLogs((prev) => [...prev, newLog]);
    setCompletedOutreaches((prev) => prev + 1);
  };

  useEffect(() => {
    localStorage.setItem("outreachLogs", JSON.stringify(outreachLogs));
    localStorage.setItem("completedOutreaches", completedOutreaches.toString());
    localStorage.setItem("outreachGoal", outreachGoal.toString());
  }, [outreachLogs, completedOutreaches, outreachGoal]);

  return (
    <OutreachContext.Provider
      value={{
        outreachLogs,
        logOutreach,
        outreachGoal,
        setOutreachGoal,
        completedOutreaches,
      }}
    >
      {children}
    </OutreachContext.Provider>
  );
}

export function useOutreach() {
  return useContext(OutreachContext);
}
