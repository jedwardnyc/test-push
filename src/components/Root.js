import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../store/categories';
import { fetchProducts } from '../store/products';
import { fetchLineItems } from '../store/lineitems';
import { fetchUsers } from '../store/users';
import { fetchOrders } from '../store/orders';

import Nav from './Nav';
import Categories from './Categories';
import Product from './Product';
import Login from './Auth/Login';
import Signin from './Auth/Signin';
import Cart from './Cart';

class Root extends Component {

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchProducts();
    this.props.fetchLineItems();
    this.props.fetchOrders();
    //this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Route exact path='/' render={()=> <Redirect to='categories' />} />
            <Route exact path='/categories' component={Categories} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/products/:id' render={({ match, history }) => <Product id={match.params.id * 1} history={history} />} />
            <Route exact path='/cart' render={({ match, history }) => <Cart id={match.params.id * 1} history={history} />} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLineItems: () => dispatch(fetchLineItems()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchProducts: () => dispatch(fetchProducts()),
    //fetchUsers: () => dispatch(fetchUsers()),
    fetchOrders: () => dispatch(fetchOrders())
  };
};

export default connect(null, mapDispatchToProps)(Root);
