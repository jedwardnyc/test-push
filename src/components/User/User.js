import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAddresses, fetchCreditCards, fetchOrders, getLoggedIn } from '../../store';

const User = (props) => {
  
  const { user, orders, addresses, creditCards } = props;

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
            Orders ({orders.length})
          </div>
        </Link>
        <Link to='/account/cards' className='account-btn'>
          <div className='account-pix'>
            <img src='/public/icons/CreditCard.svg' />
          </div>
          <div className='account-info'>
            Cards ({creditCards.length})
          </div>
        </Link>
        <Link to='/account/addresses' className='account-btn'>
          <div className='account-pix'>
            <img src='/public/icons/Addresses.svg' />
          </div>
          <div className='account-info'>
            Addresses ({addresses.length})
          </div>
        </Link>
        <Link to='/account/edit-profile' className='account-btn'>
          <div className='account-pix'>
            <img src='/public/icons/Account.svg' />
          </div>
          <div className='account-info'>
            Profile
          </div>
      </Link>
    </div>
    </div>
  )
}


const mapState = ({ auth, orders, creditCards, addresses }) => {
  const filteredOrders = orders.filter(order => order.status === 'ORDERED')
  return {
    user: auth.user,
    addresses,
    orders: filteredOrders,
    creditCards
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchOrders: (user) => dispatch(fetchOrders(user)),
    fetchCreditCards: (user) => dispatch(fetchCreditCards(user)),
    fetchAddresses: (user) => dispatch(fetchAddresses(user)),
    getLoggedIn: (user) => dispatch(getLoggedIn(user))
  }
}

export default connect(mapState, mapDispatch)(User);