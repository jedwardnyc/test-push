import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditAddress from './EditAddress';

class Addresses extends Component {
  constructor(props){
    super(props);
    this.state = {
      add: false,
      edit: false
    }
  }

  render(){
    const { addresses, user } = this.props;
    const { add, edit } = this.state;
    if (!user) return null;
    return (
      <div className='container mt-3'>
        <div className='address-header'>
          <div className='address-title'> {user.firstname}'s Addresses </div>
          <button
            onClick={(ev) => {
              ev.preventDefault()
              this.setState({ add: true })
            }}
            className='btn btn-dark address-add'>
            Add Address
          </button>
        </div>
        <div className='address-list'>
          {
            addresses.map(address => {
              return (
                <div key={address.id}>
                {
                  edit ?
                  <div className='address-add-item'>
                    <EditAddress address={address} edit={true} />
                    <div className='address-add-buttons'>
                      <button onClick={(ev) => {
                        ev.preventDefault();
                        this.setState({ edit: false })}}
                        className='btn btn-danger btn-sm'> Cancel </button>
                    </div>
                  </div>
                  :
                  <div className='address-item'>
                    <div className='address-info'>
                      <h3>{address.line1}</h3>
                      <h3>{address.line2 ? address.line2 : null}</h3>
                      <h3>{address.city}, {address.state} {address.zip}</h3>
                    </div>
                    <div className='address-buttons'>
                      <button onClick={(ev) => {
                        ev.preventDefault();
                        this.setState({ edit: true })}}
                        className='btn btn-sm btn-secondary mr-1'> Edit Address </button>
                      <button className='btn btn-sm btn-danger'> Remove Address </button>
                    </div>
                  </div>
                }

                </div>
              )
            })
          }
          {
            add ?
            <div className='address-add-item'>
              <EditAddress />
              <div className='address-add-buttons'>
                <button onClick={(ev) => {
                  ev.preventDefault();
                  this.setState({ add: false })}}
                  className='btn btn-sm btn-danger'> Cancel </button>
              </div>
            </div>
            : null
          }
        </div>
        <Link to='/account'><button className='mt-4 btn btn-sm btn-dark'> Back to Account </button></Link>
      </div>
    )
  }
}

const mapState = ({ auth, addresses }) => {
  return {
    addresses,
    user: auth.user
  }
}

export default connect(mapState)(Addresses)
