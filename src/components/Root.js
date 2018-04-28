import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories, fetchProducts, fetchLineItems, fetchUsers, fetchOrders, getLoggedIn, keepLoggedIn } from '../store';

import Nav from './Nav';
import Products from './Products';
import Product from './Product';
import Login from './Auth/Login';
import Cart from './Cart';
import Admin from './Admin/Admin';
import AdminCategories from './Admin/AdminCategories';
import AdminProducts from './Admin/AdminProducts';
import AdminEditProducts from './Admin/AdminEditProducts';
import AdminUsers from './Admin/AdminUsers';

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
      this.props.keepLoggedIn();
      this.props.getLoggedIn({token: user})
    };

    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Route exact path='/' render={()=> <Redirect to='products' />} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/products/:id' render={({ match, history }) => <Product id={match.params.id * 1} history={history} />} />
            <Route exact path='/cart' render={({ match, history }) => <Cart id={match.params.id * 1} history={history} />} />

            <Route path='/admin' render={({ location }) => <Admin path= {location.pathname} /> } />
            
            <Route path='/admin/categories' component={AdminCategories} />
            <Route path='/admin/products' render={({ match, history }) => <AdminProducts id={match.params.id * 1} history={history} />} />
            <Route path='/admin/products/:id' render={({ match, history }) => <AdminEditProducts id={match.params.id * 1} history={history} />} />
            <Route path='/admin/users' render={({ match, history }) => <AdminUsers id={match.params.id * 1} history={history} />} />

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
