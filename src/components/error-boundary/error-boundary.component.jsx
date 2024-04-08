import React from "react";
import {
  ErrorImageContainer,
  ErrorImageOverlay,
  ErrorImageText,
} from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.warn(error, "\n", info);
  }

  render() {
    const { hasErrored } = this.state;

    if (hasErrored)
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/qIufhof.png" />
          <ErrorImageText>Sorry this page is broken!!</ErrorImageText>
        </ErrorImageOverlay>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
