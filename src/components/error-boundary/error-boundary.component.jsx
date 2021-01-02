import React from 'react';
import { toast } from 'react-toastify';

/**
 * Catch rendering errors and handles them
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**Toast error message */
  componentDidCatch(error, errorInfo) {
    toast.error('😟 Something went wrong rendering the application!', {
      position: 'top-center',
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  }

  render() {
    if (this.state.hasError) {
      return <div></div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
