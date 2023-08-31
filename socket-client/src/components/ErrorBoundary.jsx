import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>OOPSS ERROR</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
