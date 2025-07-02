// components/NetworkAssistant/AIPromptSandbox.jsx

import React, { useState } from "react";
import { buildNetworkingPrompt } from "../../utils/buildNetworkingPrompt";

function AIPromptSandbox() {
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [tone, setTone] = useState("Neutral");
  const [draft, setDraft] = useState("");
  const [health, setHealth] = useState("Cold");
  const [result, setResult] = useState("");

  const generatePrompt = () => {
    const prompt = buildNetworkingPrompt({
      contact: { name, jobTitle },
      tone,
      userDraft: draft,
      relationshipHealth: health,
    });
    setResult(prompt);
  };

  return (
    <section className="spacing-md">
      <h3>🧪 AI Prompt Sandbox</h3>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} /><br />
      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option>Neutral</option><option>Friendly</option><option>Professional</option><option>Casual</option><option>Empathetic</option>
      </select><br />
      <select value={health} onChange={(e) => setHealth(e.target.value)}>
        <option>Cold</option><option>Warm</option><option>Hot</option>
      </select><br />
      <textarea rows={3} placeholder="Optional Draft" value={draft} onChange={(e) => setDraft(e.target.value)} /><br />
      <button className="button-secondary" onClick={generatePrompt}>Generate Prompt</button>

      {result && (
        <pre style={{ background: "var(--color-surface)", padding: "8px", marginTop: "8px" }}>{result}</pre>
      )}
    </section>
  );
}

export default React.memo(AIPromptSandbox);
