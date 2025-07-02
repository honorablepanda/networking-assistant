// modules/NetworkAssistantDashboard.jsx

import React from "react";
import { AppContextProvider } from "../contexts/AppContextProvider";  // ✅ Global context
import ErrorBoundary from "../components/NetworkAssistant/ErrorBoundary";  // ✅ Error boundary import

import ContactFilterBar from "../components/NetworkAssistant/ContactFilterBar";
import ContactList from "../components/NetworkAssistant/ContactList";
import NextBestAction from "../components/NetworkAssistant/NextBestAction";
import AIOutreachWizard from "../components/NetworkAssistant/AIOutreachWizard";
import GoalTracker from "../components/NetworkAssistant/GoalTracker";
import EngagementTimeline from "../components/NetworkAssistant/EngagementTimeline";
import AIMessageToneSelector from "../components/NetworkAssistant/AIMessageToneSelector";

import Badges from "../components/NetworkAssistant/Badges";
import ColdContactChallenges from "../components/NetworkAssistant/ColdContactChallenges";
import DailyTaskFeed from "../components/NetworkAssistant/DailyTaskFeed";

import ContactSearchBar from "../components/NetworkAssistant/ContactSearchBar";
import ContactDetailView from "../components/NetworkAssistant/ContactDetailView";
import AIPromptDebugPanel from "../components/NetworkAssistant/AIPromptDebugPanel";
import HistoryExportPanel from "../components/NetworkAssistant/HistoryExportPanel";
import UserSettingsPanel from "../components/NetworkAssistant/UserSettingsPanel";
import ContactImportPanel from "../components/NetworkAssistant/ContactImportPanel";
import AIPromptSandbox from "../components/NetworkAssistant/AIPromptSandbox";
import OnboardingTour from "../components/NetworkAssistant/OnboardingTour";
import ContactAnalyticsPanel from "../components/NetworkAssistant/ContactAnalyticsPanel";

function NetworkAssistantDashboard() {
  return (
    <AppContextProvider>
      <ErrorBoundary>
        <div className="container">
          <h1>Networking Assistant Dashboard</h1>

          <div className="fade-in"><ContactSearchBar /></div>
          <div className="fade-in"><ContactFilterBar /></div>
          <div className="fade-in"><ContactList /></div>
          <div className="fade-in"><ContactDetailView /></div>
          <div className="fade-in"><NextBestAction /></div>
          <div className="fade-in"><AIMessageToneSelector /></div>
          <div className="fade-in"><AIOutreachWizard /></div>
          <div className="fade-in"><GoalTracker /></div>
          <div className="fade-in"><EngagementTimeline /></div>
          <div className="fade-in"><DailyTaskFeed /></div>
          <div className="fade-in"><Badges /></div>
          <div className="fade-in"><ColdContactChallenges /></div>
          <div className="fade-in"><AIPromptDebugPanel /></div>
          <div className="fade-in"><HistoryExportPanel /></div>
          <div className="fade-in"><UserSettingsPanel /></div>
          <div className="fade-in"><ContactImportPanel /></div>
          <div className="fade-in"><AIPromptSandbox /></div>
          <div className="fade-in"><OnboardingTour /></div>
          <div className="fade-in"><ContactAnalyticsPanel /></div>
        </div>
      </ErrorBoundary>
    </AppContextProvider>
  );
}

export default NetworkAssistantDashboard;
