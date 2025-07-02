// components/NetworkAssistant/CampaignOutreachWizard.jsx

import React, { useState } from "react";
import { useNetworkAssistant } from "../../contexts/NetworkAssistantContext";
import { buildNetworkingPrompt } from "../../utils/buildNetworkingPrompt";

function CampaignOutreachWizard() {
  const { contacts, selectedTone, logOutreach } = useNetworkAssistant();
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [draftMessage, setDraftMessage] = useState("");
  const [step, setStep] = useState(1);
  const [aiPrompt, setAiPrompt] = useState("");

  const toggleContactSelection = (contactId) => {
    setSelectedContactIds((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const generateBatchDraft = () => {
    const selectedContacts = contacts.filter((c) =>
      selectedContactIds.includes(c.id)
    );

    const namesList = selectedContacts.map((c) => c.name).join(", ");

    const prompt = buildNetworkingPrompt({
      contact: { name: namesList, jobTitle: "Multiple Contacts" },
      tone: selectedTone,
      userDraft: "",
      relationshipHealth: "Mixed",
    });

    console.log("🔍 Campaign AI Prompt:", prompt);
    setAiPrompt(prompt);

    setDraftMessage(
      `Hi everyone,\n\nI hope this message finds you well. Just wanted to reconnect and share some updates... [AI-generated content here]`
    );

    setStep(2);
  };

  const finalizeAndLogBatch = () => {
    selectedContactIds.forEach((contactId) => {
      logOutreach(contactId, draftMessage);
    });
    resetWizard();
  };

  const resetWizard = () => {
    setSelectedContactIds([]);
    setDraftMessage("");
    setAiPrompt("");
    setStep(1);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fefefe",
      }}
    >
      <h3>Campaign Outreach Wizard</h3>

      {step === 1 && (
        <>
          <p><strong>Step 1:</strong> Select contacts for the outreach campaign:</p>
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            {contacts.map((contact) => (
              <li key={contact.id} style={{ marginBottom: "6px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedContactIds.includes(contact.id)}
                    onChange={() => toggleContactSelection(contact.id)}
                  />{" "}
                  {contact.name} - {contact.jobTitle}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={generateBatchDraft}
            disabled={selectedContactIds.length === 0}
          >
            Generate AI Draft for Campaign
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p><strong>Step 2:</strong> Review and Edit Campaign Message:</p>
          <textarea
            rows={8}
            style={{ width: "100%" }}
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
          />
          <button onClick={finalizeAndLogBatch} style={{ marginTop: "10px" }}>
            Finalize & Log Outreach for All Selected Contacts
          </button>

          {aiPrompt && (
            <div
              style={{
                marginTop: "10px",
                background: "#f0f0f0",
                padding: "10px",
                fontSize: "12px",
                borderRadius: "6px",
              }}
            >
              <strong>Generated AI Prompt (Debug View):</strong>
              <pre style={{ whiteSpace: "pre-wrap" }}>{aiPrompt}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CampaignOutreachWizard;
