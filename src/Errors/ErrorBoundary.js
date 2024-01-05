import React, { Component } from 'react';
import ErrorPage from '../Errors/Errors.js';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    return this.state.hasError ? <ErrorPage errorMessage={"An Error has Occurred"} /> : this.props.children;
  }
}

export default ErrorBoundary;