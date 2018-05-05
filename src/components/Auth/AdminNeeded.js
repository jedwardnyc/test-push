import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (CheckedComponent) => {
  class AdminNeeded extends Component {

    componentWillMount() {
      if(!this.props.user) return null
      if (!this.props.user.isAdmin) {
        this.props.history.push('/products');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.user.id) {
        this.props.history.push('/products');
      }
    }

    render() {
      return <CheckedComponent {...this.props} />;
    }
  }

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  };
};

  return connect(mapStateToProps)(AdminNeeded);
};
