import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "../vibes";
import { COLORS } from "../constants/colors";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "48px", textAlign: "center" }}>
          <h2 style={{ color: COLORS.red.re05 }}>Something went wrong</h2>
          <p style={{ color: COLORS.text.secondary }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button variant="primary" onClick={this.handleReload}>
            Reload
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
