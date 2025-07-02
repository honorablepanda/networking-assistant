// components/NetworkAssistant/ErrorBoundary.jsx

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "var(--color-danger)" }}>
          <h2>Something went wrong 😢</h2>
          <p>Please refresh or contact support if the issue persists.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
