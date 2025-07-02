// components/NetworkAssistant/LiveRegion.jsx

import React from "react";

function LiveRegion({ message }) {
  return (
    <div aria-live="polite" aria-atomic="true" style={{ position: "absolute", left: "-9999px" }}>
      {message}
    </div>
  );
}

export default React.memo(LiveRegion);
