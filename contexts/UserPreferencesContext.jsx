// contexts/UserPreferencesContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

const UserPreferencesContext = createContext();

export function UserPreferencesProvider({ children }) {
  const [userNickname, setUserNickname] = useState(() => localStorage.getItem("nickname") || "User");

  useEffect(() => {
    localStorage.setItem("nickname", userNickname);
  }, [userNickname]);

  return (
    <UserPreferencesContext.Provider value={{ userNickname, setUserNickname }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  return useContext(UserPreferencesContext);
}
