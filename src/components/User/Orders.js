import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Orders = (props) => {

  const { orders, user } = props;

  if (!user) return null;
  return (
    <div className='container mt-3'>
      <div className='order-header'>
        <div className='mb-2 order-title'> {user.firstname}'s Orders </div>
      </div>
      <div className='order-list'>
        {
          orders.map(order => {
            return (
              <div className='order-item' key={order.id}>
                <div className='order-info'>
                  <h2>Hold for Order info</h2>
                </div>
              </div>
            )
          })
        }
      </div>
      <Link to='/account'><button className='mt-4 btn btn-sm btn-dark'> Back to Account </button></Link>
    </div>
  )
}

const mapState = ({ auth, orders }) => {
  return {
    orders,
    user: auth.user
  }
}

export default connect(mapState)(Orders)