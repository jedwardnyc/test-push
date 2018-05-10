import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders, fetchCreditCards, fetchAddresses, getLoggedIn } from '../../store';

class User extends Component {

  componentDidMount() {
    const { user } = this.props;
    
    if(!user){
      this.props.getLoggedIn()
      .then((_user) => {
        this.props.fetchOrders(_user);
        this.props.fetchCreditCards(_user);
        this.props.fetchAddresses(_user);
      })
    }
    else {
      this.props.fetchOrders(user);
      this.props.fetchCreditCards(user);
      this.props.fetchAddresses(user);
    }
  }

  render(){
    const { user, orders, addresses, creditCards } = this.props;
    
    if(!user) return null

    return (
      <div id='account' className='container mt-3'>
      <div className='account-title'> {user.fullname}'s Account </div>
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
              <img src='/public/icons/Address.svg' />
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
        {
          user.isAdmin ?
          <div className='account-admin'> 
            <div className='admin-title'> Administrative Features </div>
            <div className='account-btns-admin'>
              <Link to='/admin/categories' className='account-btn'>
                <div className='account-pix'>
                  <img src='/public/icons/Categories.svg' />
                </div>
                <div className='account-info-admin'>
                  Edit Categories              
                </div>
              </Link>
              <Link to='/admin/products' className='account-btn'>
                <div className='account-pix'>
                  <img src='/public/icons/Products.svg' />
                </div>
                <div className='account-info-admin'>
                  Edit Products            
                </div>
              </Link>
              <Link to='/admin/users' className='account-btn'>
                <div className='account-pix'>
                  <img src='/public/icons/Users.svg' />
                </div>
                <div className='account-info-admin'>
                  Edit Users            
                </div>
              </Link>
            </div>
          </div>
          : null
        }
      </div>
    )
  }
}

const mapState = ({ auth, orders, creditCards, addresses }) => {
  const filteredOrders = orders.filter(order => order.status === 'ORDERED');
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
    getLoggedIn: () => dispatch(getLoggedIn())
  }
}

export default connect(mapState, mapDispatch)(User);