// components/NetworkAssistant/HistoryExportPanel.jsx

import React from "react";
import { useOutreach } from "../../contexts/OutreachContext";

function HistoryExportPanel() {
  const { outreachLogs } = useOutreach();

  const exportData = (type) => {
    let data, filename, mime;
    if (type === "json") {
      data = JSON.stringify(outreachLogs, null, 2);
      filename = "outreach_logs.json";
      mime = "application/json";
    } else {
      const header = "ID,ContactID,Message,Date";
      const rows = outreachLogs.map(log =>
        `${log.id},"${log.contactId}","${log.messageContent.replace(/"/g, '""')}",${log.date}`
      );
      data = [header, ...rows].join("\n");
      filename = "outreach_logs.csv";
      mime = "text/csv";
    }

    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (outreachLogs.length === 0) return null;

  return (
    <section className="spacing-md">
      <h3>📤 Export Outreach History</h3>
      <button className="button-secondary" onClick={() => exportData("json")}>Export as JSON</button>{" "}
      <button className="button-secondary" onClick={() => exportData("csv")}>Export as CSV</button>
    </section>
  );
}

export default React.memo(HistoryExportPanel);
