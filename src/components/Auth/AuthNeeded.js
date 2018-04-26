import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (CheckedComponent) => {
  class Authenticated extends Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <CheckedComponent {...this.props} />;
    }
  }

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated
  };
};

  return connect(mapStateToProps)(Authenticated);
};
