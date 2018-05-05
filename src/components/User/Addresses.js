import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAddresses } from '../../store';

const Addresses = (props) => {

  const { addresses, user } = props;

  return (
    <div className='container mt-3'>
      <h1 className='mb-2'> Addresses </h1>
      <button className='btn btn-dark'> Add Address </button>
      <div className='address-list'>
        {
          addresses.map(address => {
            return (
              <div className='address-item' key={address.id}>
                  <h3>{address.line1}</h3>
                  <h3>{address.line2 ? address.line2 : null}</h3>
                  <h3>{address.city}, {address.state} {address.zip}</h3>
                  <button className='btn btn-sm btn-secondary mr-1'> Edit Address </button>
                  <button className='btn btn-sm btn-danger'> Remove Address </button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const mapState = ({ auth, addresses }) => {
  return {
    addresses,
    user: auth.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchAddresses: (user) => dispatch(fetchAddresses(user))
  }
}

export default connect(mapState, mapDispatch)(Addresses)