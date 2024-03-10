import { Component, ReactNode } from "react";
import Custom404 from "@/pages/_error";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: ErrorBoundaryState) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <Custom404 />;

    return this.props.children;
  }
}

export default ErrorBoundary;
