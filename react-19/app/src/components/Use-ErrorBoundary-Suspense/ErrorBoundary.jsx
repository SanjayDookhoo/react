import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      // console.log(error)
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
