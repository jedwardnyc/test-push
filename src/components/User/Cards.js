import React, { Component } from 'react';
import { connect } from 'react-redux';

const CreditCards = (props) => {
  return (
    <div className='container mt-3'>
    <h1> Credit Cards </h1>
    </div>
  )
}

const mapState = ({ creditCards }) => {
  return {
    creditCards
  }
}
export default connect(mapState)(CreditCards)