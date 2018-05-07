import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditAddress from './EditAddress';
import { deleteAddress } from '../../store';

class Addresses extends Component {
  constructor(props){
    super(props);
    this.state = {
      add: false,
      edit: false
    }
    this.edit = this.edit.bind(this)
    this.add = this.add.bind(this)
  }

  edit(edit){
    this.setState(edit)
  }

  add(add){
    this.setState(add)
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
              ev.preventDefault();
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
                  <div className='add-item'>
                    <EditAddress address={address} edit={this.edit} user={user}/>
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
                      <button 
                        onClick={(ev) => {
                          ev.preventDefault();
                          this.props.deleteAddress(address)
                        }}
                        className='btn btn-sm btn-danger'> 
                        Remove Address 
                      </button>
                    </div>
                  </div>
                }
                </div>
              )
            })
          }
          {
            add ?
            <div className='add-item'> 
              <EditAddress user={user} add={this.add}/>
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
    user: auth.user,
  }
}

const mapDispatch = dispatch => {
  return {
    deleteAddress: (address) => dispatch(deleteAddress(address)),
  }
}


export default connect(mapState, mapDispatch)(Addresses)