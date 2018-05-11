import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkOutUser, createAddress, createCreditCard } from '../store';
import ShoppingList from './ShoppingList';
import EditAddress from './User/EditAddress';
import EditCard from './User/EditCard';
import Checkout from './Stripe';

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editAddress: false,
      editCard: false,
      address: {},
      card: {},
      cardId: undefined,
      addressId: undefined
    }
    this.onPlaceOrder = this.onPlaceOrder.bind(this);
    this.addressToggle = this.addressToggle.bind(this);
    this.cardToggle = this.cardToggle.bind(this);
  }

  onPlaceOrder(ev) {
    const { cardId, addressId, editCard, editAddress } = this.state;
    const { line1, line2, city, state, zip } = this.state.address;
    const { firstname, lastname, number, exp } = this.state.card;
    const { userId, checkOutUser, createCreditCard, createAddress, userCartItems } = this.props;
    if (userCartItems.length) {
      if (editCard) { 
        createCreditCard({ firstname, lastname, number, exp, user_id: userId })
        .then(res => {
          checkOutUser( userId, res.creditCard.id, addressId)
        })
      }
      if (editAddress) { 
        createAddress({ line1, line2, city, state, zip, user_id: userId })
        .then(res => {
          checkOutUser( userId, cardId, res.address.id)
        })
      }
      if (editCard && editAddress) {
        Promise.all([
          createAddress({ line1, line2, city, state, zip, user_id: userId }),
          createCreditCard({ firstname, lastname, number, exp, user_id: userId })
        ])
        .then(([address, card]) => checkOutUser(userId, creditCard.card, address.address))
      }
      else {
        checkOutUser(userId, cardId, addressId)
      }
    }
    else {
      console.log('This will not get called if submit is disabled');
    }
  }

  addressToggle(ev){
    ev.preventDefault();
    this.setState( this.state.editAddress ? { editAddress: false } : { editAddress: true })
  }

  cardToggle(ev){
    ev.preventDefault();
    this.setState( this.state.editCard ? { editCard: false } : { editCard: true })
  }

  render() {
    const { onPlaceOrder, addressToggle, cardToggle } = this;
    const { userCartItems, subTotal, totalLineItems, user, userId, addresses, creditCards, line1, line2, city, state, zip, history } = this.props;
    const { editAddress, editCard, address, card, addressId, cardId } = this.state;
    if (!user) return null;
    return (
      <div className="container-fluid m-4">
        <div className="row">
          <div className="col-sm-9">
            <div className="h1 border-bottom border-gray pb-2 mb-0">Checkout</div>
            <div id="accordion">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    1 &mdash; Shipping address
                    </button>
                  </h5>
                </div>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body">
                    {
                      editAddress ?
                      <form>
                        <div className='address-form'>
                          <div className='form-group'>
                            <label> Street Address </label>
                            <input 
                              className='form-control' 
                              placeholder='1234 Main St'
                              onChange={(ev) => this.setState(Object.assign(address, { line1: ev.target.value }))}/>
                          </div>
                          <div className='form-group'>
                            <label> Apt/Floor/Suite </label>
                            <input 
                              className='form-control' 
                              placeholder='Apartment or floor'
                              onChange={(ev) => this.setState(Object.assign(address, { line2: ev.target.value }))}/>
                          </div>
                          <div className='form-row'>
                            <div className='form-group col-md-6'>
                              <label> City </label>
                              <input 
                                className='form-control' 
                                placeholder='City Town'
                                onChange={(ev) => this.setState(Object.assign(address, { city: ev.target.value }))}/>
                            </div>
                            <div className='form-group col-md-2'>
                              <label> State </label>
                              <input 
                                className='form-control' 
                                placeholder='CA'
                                onChange={(ev) => this.setState(Object.assign(address, { state: ev.target.value }))}/>
                            </div>
                            <div className='form-group col-md-4'>
                              <label> Zip </label>
                              <input 
                                className='form-control' 
                                placeholder='12345'
                                onChange={(ev) => this.setState(Object.assign(address, { zip: ev.target.value }))}/>
                            </div>
                          </div>
                        </div>
                      </form>
                      : 
                      <div>
                        <select onChange={(ev) => this.setState({ addressId: ev.target.value *1 })}>
                          <option value='-1'> --- Select an Address --- </option>
                        {
                          addresses.map(address => <option key={address.id} value={address.id}>{address.line1}</option>)
                        }
                        </select>
                        <h6> or </h6>
                      </div>
                    }
                    <button onClick={this.addressToggle}> { editAddress ? 'Cancel' : 'Add a new address' }</button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    2 &mdash; Payment method
                    </button>
                  </h5>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                  <div className="card-body">
                  {
                    editCard ?
                    <form>
                      <div className='form-row'>
                        <div className='form-group col-6'>
                          <input 
                            className='form-control' 
                            placeholder='Janeathon'
                            onChange={(ev) => this.setState(Object.assign(card, { firstname: ev.target.value }))}/>
                        </div>
                        <div className='form-group col-6'>
                          <input 
                            className='form-control' 
                            placeholder='Smithy'
                            onChange={(ev) => this.setState(Object.assign(card, { lastname: ev.target.value }))}/>
                        </div>
                      </div>
                      <div className='form-row'>
                        <div className='form-group col-8'>
                          <input 
                            className='form-control' 
                            placeholder='1234 4678 9012 3456'
                            onChange={(ev) => this.setState(Object.assign(card, { number: ev.target.value *1}))}/>
                        </div>
                        <div className='form-group col-4'>
                          <input 
                            className='form-control' 
                            placeholder='01/20'
                            onChange={(ev) => this.setState(Object.assign(card, { exp: ev.target.value }))}/>
                        </div>
                      </div>
                    </form>
                    : 
                    <div>
                      <select onChange={(ev) => this.setState({ cardId: ev.target.value *1 })}>
                        <option value='-1'> --- Select an Credit Card --- </option>
                      {
                        creditCards.map(creditCard => <option key={creditCard.id} value={creditCard.id}> {creditCard.firstname}</option>)
                      }
                      </select>
                      <h6> or </h6>
                    </div>
                  }
                    <button onClick={this.cardToggle}> { editCard ? 'Cancel' : 'Add a new credit card' }</button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      3 &mdash; Review items
                    </button>
                  </h5>
                </div>
                <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
                  <div className="card-body">
                    <ShoppingList />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3 text-center">
            <div className="card card-side bg-light">
              <div className="card-body">
                <h5 className="card-title">Order summary</h5>
                <h5 className="card-title">Total item{ totalLineItems > 1 ? 's' : '' }: { totalLineItems }</h5>
                <h5 className="card-title">Subtotal: ${ subTotal.toLocaleString('USD') }</h5>
                <p className="card-text"><button className="btn btn-block btn-primary p-2" onClick={ onPlaceOrder } disabled={ !userCartItems.length }> Checkout </button></p>
                <Checkout name='The Light Web' description='A light site for your dark needs' history={history} amount={subTotal} user={userId} address={addressId ? addressId : address ? address : null }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, lineItems, auth, products, addresses, creditCards }) => {

  const userCartItems = lineItems.filter(item => item.order_id == cart.id && item );
  const userAddresses = addresses.filter(address => address.user_id === auth.user.id );
  const userCards = creditCards.filter(creditCard => creditCard.user_id === auth.user.id );
  const userId = cart.user_id;

  const productMap = products.reduce((memo, product) => {
    memo[product.id] = product;
    return memo;
  }, {});

  const subTotal = userCartItems.reduce((sum, item) => {
    sum += (productMap[item.product_id].price * item.quantity);
    return sum;
  }, 0);

  const totalLineItems = userCartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return {
    userCartItems,
    userId,
    user: auth.user,
    addresses: userAddresses,
    creditCards: userCards,
    subTotal,
    totalLineItems
  };

};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    checkOutUser: (userId, card, address) => dispatch(checkOutUser(userId, card, address))
    .then(() => history.push('/products')),
    createAddress: (address) => dispatch(createAddress(address)),
    createCreditCard: (card) => dispatch(createCreditCard(card))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
