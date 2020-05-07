import React, { Component } from 'react';

import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends Component {
  state = {
    hasErrored: false
  }

  // this life-cycle method is called when there is any error rendering the children (ErrorBoundary will wrap our lazy loaded pages)
  static getDerivedStateFromError(error) {
    return { hasErrored: true }
  }

  // gives us info about which component threw the error
  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/DWO5Hzg.png' />
          <ErrorImageText>Sorry, something went worng :(</ErrorImageText>
        </ErrorImageOverlay>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;