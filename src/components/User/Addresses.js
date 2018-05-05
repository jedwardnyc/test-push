import React, { Component } from 'react';
import { connect } from 'react-redux';

const Addresses = (props) => {
  return (
    <div className='container mt-3'>
    <h1> Addresses </h1>
    </div>
  )
}

const mapState = ({ addresses }) => {
  return {
    addresses
  }
}
export default connect(mapState)(Addresses)