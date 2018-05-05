import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAddresses, fetchCreditCards, fetchOrders } from '../../store';

const User = (props) => {

  const { user } = props;
 
 
    props.fetchOrders(user);
    props.fetchCreditCards(user);
    props.fetchAddresses(user);
  
  if(!user) return null

  return (
    <div id='account' className='container mt-3'>
     <h1 className='account-title'> {user.fullname}'s Account </h1>
      <div className='account-btns'> 
        <Link to='/account/orders' className='account-btn'>
          <div className='account-pix'>
            <img src='/public/icons/Orders.svg' />
          </div>
          <div className='account-info'>
            Orders (0)
          </div>
        </Link>
        <Link to='/account/cards' className='account-btn'>
          <div className='account-pix'>
            <img src='/public/icons/CreditCard.svg' />
          </div>
          <div className='account-info'>
            Cards (0)
          </div>
        </Link>
        <Link to='/account/addresses' className='account-btn'>
          <div className='account-pix'>
            <img src='/public/icons/Addresses.svg' />
          </div>
          <div className='account-info'>
            Addresses (0)
          </div>
        </Link>
        <Link to='/account/edit-profile' className='account-btn'>
          <div className='account-pix'>
            <img src='/public/icons/Account.svg' />
          </div>
          <div className='account-info'>
            Profile (0)
          </div>
      </Link>
    </div>
    </div>
  )
}

const mapState = ({ auth }) => {
  return {
    user: auth.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchOrders: (user) => dispatch(fetchOrders(user)),
    fetchCreditCards: (user) => dispatch(fetchCreditCards(user)),
    fetchAddresses: (user) => dispatch(fetchAddresses(user))
  }
}

export default connect(mapState, mapDispatch)(User);