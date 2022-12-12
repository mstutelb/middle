import { Component } from 'react';

class ErrorWrapper extends Component {
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <p>some error goes here!</p>;
    }
    return this.props.children;
  }
}

export default ErrorWrapper;
