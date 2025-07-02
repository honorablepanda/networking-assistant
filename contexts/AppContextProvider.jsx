// contexts/AppContextProvider.jsx

import React from "react";

import { ThemeProvider } from "./ThemeContext";
import { ContactProvider } from "./ContactContext";
import { OutreachProvider } from "./OutreachContext";
import { UserPreferencesProvider } from "./UserPreferencesContext";
import { AIPromptLogProvider } from "./AIPromptLogContext";
import { NetworkAssistantProvider } from "./NetworkAssistantContext";

export function AppContextProvider({ children }) {
  return (
    <ThemeProvider>
      <UserPreferencesProvider>
        <NetworkAssistantProvider>
          <ContactProvider>
            <OutreachProvider>
              <AIPromptLogProvider>
                {children}
              </AIPromptLogProvider>
            </OutreachProvider>
          </ContactProvider>
        </NetworkAssistantProvider>
      </UserPreferencesProvider>
    </ThemeProvider>
  );
}
