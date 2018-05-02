import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories, fetchProducts, fetchLineItems, fetchUsers, fetchOrders, getLoggedIn, keepLoggedIn, setCart } from '../store';

import Nav from './Nav';
import Products from './Products';
import Product from './Product';
import Login from './Auth/Login';
import Cart from './Cart';
import AdminCategories from './Admin/AdminCategories';
import AdminProducts from './Admin/AdminProducts';
import AdminEditProducts from './Admin/AdminEditProducts';
import AdminUsers from './Admin/AdminUsers';
import ForgotPW from './Auth/ForgotPW';
import ResetPW from './Auth/ResetPW';

class Root extends Component {

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchProducts();
    this.props.fetchLineItems();
    this.props.fetchOrders();
    const user = localStorage.getItem('user');
    if (user) {
      this.props.getLoggedIn({ token: user })
      .then(_user => {
        this.props.setCart(_user);
      });
    }
  }

  render() {
    const user = localStorage.getItem('user')
    if(user) {
      this.props.keepLoggedIn();
    }

    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' render={()=> <Redirect to='products' />} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:id' render={({ match, history }) => <Product id={match.params.id * 1} history={history} />} />

            <Route exact path='/admin/categories' component={AdminCategories} />
            <Route exact path='/admin/products' render={({ match, history }) => <AdminProducts id={match.params.id * 1} history={history} />} />
            <Route exact path='/admin/products/:id' render={({ match, history }) => <AdminEditProducts id={match.params.id * 1} history={history} />} />
            <Route exact path='/admin/users' render={({ match, history }) => <AdminUsers id={match.params.id * 1} history={history} />} />
            <Route exact path='/cart' render={({ match }) => <Cart id={match.params.id * 1} history={history} />} />
            <Route exact path='/forgot' component={ForgotPW} />
            <Route exact path='/reset/:token' render={({ match }) => <ResetPW token={match.params.token}/>} />
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
    keepLoggedIn: () => dispatch(keepLoggedIn()),
    setCart: user => dispatch(setCart(user))
  };
};

export default connect(null, mapDispatchToProps)(Root);
