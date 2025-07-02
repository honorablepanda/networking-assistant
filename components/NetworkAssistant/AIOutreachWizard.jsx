// components/NetworkAssistant/AIOutreachWizard.jsx

import React, { useState, useEffect } from "react";
import { useContacts } from "../../contexts/ContactContext";
import { useOutreach } from "../../contexts/OutreachContext";
import { useAIPromptLog } from "../../contexts/AIPromptLogContext";
import { buildNetworkingPrompt } from "../../utils/buildNetworkingPrompt";

function AIOutreachWizard() {
  const { selectedContact } = useContacts();
  const { logOutreach } = useOutreach();
  const { logAiPrompt } = useAIPromptLog();

  const [step, setStep] = useState(1);
  const [draftMessage, setDraftMessage] = useState("");
  const [userEdit, setUserEdit] = useState("");
  const [refinedMessage, setRefinedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!selectedContact) {
    return <p role="alert">Please select a contact to start outreach.</p>;
  }

  const generateDraft = () => {
    setLoading(true);
    const mockDraft = `Hi ${selectedContact.name},\n\nHope you're doing well! Wanted to reach out regarding your role as ${selectedContact.jobTitle}.`;

    setTimeout(() => {
      setDraftMessage(mockDraft);
      setStep(2);
      setLoading(false);
    }, 800);
  };

  const refineMessage = () => {
    const aiPromptText = buildNetworkingPrompt({
      contact: selectedContact,
      tone: "Friendly",
      userDraft: userEdit || draftMessage,
      relationshipHealth: selectedContact.relationshipHealth,
    });

    logAiPrompt("AIOutreachWizard", aiPromptText);
    setRefinedMessage(`${userEdit || draftMessage}\n\n[AI refined version based on tone]`);
    setStep(4);
  };

  const finalizeOutreach = () => {
    logOutreach(selectedContact.id, refinedMessage || userEdit || draftMessage);
    resetWizard();
    window.scrollTo(0, 0); // Micro UX: scroll to top after logging
  };

  const resetWizard = () => {
    setStep(1);
    setDraftMessage("");
    setUserEdit("");
    setRefinedMessage("");
  };

  return (
    <section aria-labelledby="ai-outreach-heading" className="spacing-md">
      <h3 id="ai-outreach-heading">🤖 AI Outreach Wizard</h3>

      {step === 1 && (
        <>
          <p>Step 1: Generate AI Draft</p>
          <button className="button-primary" onClick={generateDraft} disabled={loading}>
            {loading ? "Generating..." : "Generate Draft"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p>Step 2: Review & Edit Draft</p>
          <textarea
            rows={6}
            style={{ width: "100%" }}
            value={userEdit || draftMessage}
            onChange={(e) => setUserEdit(e.target.value)}
          />
          <button className="button-secondary" onClick={refineMessage} disabled={loading}>
            Continue → AI Refine
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <p>Step 3: Final Review</p>
          <textarea
            rows={6}
            style={{ width: "100%" }}
            value={refinedMessage}
            onChange={(e) => setRefinedMessage(e.target.value)}
          />
          <button className="button-primary" onClick={finalizeOutreach}>
            Finalize & Log Outreach
          </button>
        </>
      )}

      {loading && <div className="loading-spinner" aria-live="polite" />}
    </section>
  );
}

export default React.memo(AIOutreachWizard);
