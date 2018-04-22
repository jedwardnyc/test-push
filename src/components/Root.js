import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../store/categories';
import { fetchProducts } from '../store/products';

import Nav from './Nav';
import Categories from './Categories';
import Product from './Product';

class Root extends Component {

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchProducts();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Route exact path='/' component={Categories} />
            <Route exact path='/:id' render={({ match, history }) => <Product id={match.params.id*1} history={history} />} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchProducts: () => dispatch(fetchProducts())
  };
};

export default connect(null, mapDispatchToProps)(Root);
