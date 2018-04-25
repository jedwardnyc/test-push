import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (CheckedComponent) => {

  class NotAuthenticated extends Component {
    componentWillMount() {
      if (this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return <CheckedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ auth }) {
    return { 
      authenticated: auth.authenticated 
    }
  }

  return connect(mapStateToProps)(NotAuthenticated);
};