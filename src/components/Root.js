import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories, fetchProducts, fetchLineItems, fetchUsers, fetchOrders, getLoggedIn, keepLoggedIn } from '../store';

import Nav from './Nav';
import Categories from './Categories';
import Product from './Product';
import Login from './Auth/Login';
import Cart from './Cart';
import ForgotPW from './Auth/ForgotPW';

class Root extends Component {

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchProducts();
    this.props.fetchLineItems();
    this.props.fetchOrders();
  }

  render() {
    const user = localStorage.getItem('user')
    if(user) {
      this.props.getLoggedIn({ token: user })
    };

    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Route exact path='/' render={()=> <Redirect to='categories' />} />
            <Route exact path='/categories' component={Categories} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/products/:id' render={({ match, history }) => <Product id={match.params.id * 1} history={history} />} />
            <Route exact path='/cart' render={({ match }) => <Cart id={match.params.id * 1} history={history} />} />
            <Route exact path='/forgot' component={ForgotPW} />
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
    fetchOrders: () => dispatch(fetchOrders()),
    getLoggedIn: (user) => dispatch(getLoggedIn(user)),
    keepLoggedIn: () => dispatch(keepLoggedIn())
  };
};

export default connect(null, mapDispatchToProps)(Root);
