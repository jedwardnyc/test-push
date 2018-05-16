import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, createSearchResult, deleteSearchResult } from '../store';
import fontawesome from '@fortawesome/fontawesome';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Autosuggest from 'react-autosuggest';

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      suggestions: [],
      results: []
    }
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return this.props.products.filter(product => regex.test(product.name));
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  onChange(event, { newValue }) {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value),
      results: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  onResults(value, results) {
    if (!value && results) {
      return;
    }
    const product = results.find(product => product.name === value);
    this.props.searchResults.forEach(searchResult => {
      this.props.deleteSearchResult({ id: searchResult.id })
    });
    this.setState({ value: '' });
    
    if (product) {
      if (this.props.history.location.pathname !== `/products/${product.id}`)
      this.props.history.push(`/products/${product.id}`);
      return;
    } else {
      results.forEach(product => {
        this.props.createSearchResult(product);
      })
      if (this.props.history.location.pathname !== '/products/searchResults')
        this.props.history.push('/products/searchResults');
    }
  }

  render() {
    fontawesome.library.add(faShoppingCart);

    const { totalLineItems, logout, onResults } = this.props;
    let { user } = this.props;

    const { value, suggestions, results } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange
    };

    if (!user) user = {};
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <Link className='text-center navbar-brand' activeclassname='active' to='/'>
            <img src='/public/icons/TLW-icon-light.svg' width='40' height='50' className='mr-3 d-inline-block' />
            The Light Web</Link>
          <div className='input-group'>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={(value) => this.onSuggestionsFetchRequested(value)}
              onSuggestionsClearRequested={() => this.onSuggestionsClearRequested()}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-light'
                onClick={() => this.onResults(value, results)}
              >Search</button>
            </div>
          </div>
          <div className='col-md-3 collapse navbar-collapse justify-content-end'>
            {
              user.id ?
                <ul className='navbar-nav'>
                  <div className='dropdown'>
                    <Link className='nav-link' to='#' role='button' data-toggle='dropdown'>
                      Hello {user.firstname}</Link>
                    <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                      <Link className='dropdown-item' to='/account'> My Account </Link>
                      <Link className='dropdown-item' to='/account/orders'> My Orders </Link>
                      <Link className='dropdown-item' to='/account/edit-profile'> Edit Profile </Link>
                      <div className='dropdown-divider' />
                      <Link className='dropdown-item' to='/login' onClick={logout}> Log Out </Link>
                    </div>
                  </div>
                  {
                    user.isAdmin ?
                      <div className='dropdown spacer'>
                        <Link className='btn btn-outline-light dropdown-toggle' to='#' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                          Admin</Link>
                        <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                          <Link className='dropdown-item' to='/admin/categories'>Edit Categories</Link>
                          <Link className='dropdown-item' to='/admin/products'>Edit Products</Link>
                          <div className='dropdown-divider' />
                          <Link className='dropdown-item' to='/admin/users'>Edit Users</Link>
                        </div>
                      </div>
                      : null
                  }
                </ul>
                :
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/login'>Sign in</Link>
                  </li>
                </ul>
            }
            <Link className='nav-link' to='/cart'>
              <button className='btn btn-outline-light my-2 my-lg-0'>{<FontAwesomeIcon icon={faShoppingCart} />} ({totalLineItems})</button>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}


const mapStateToProps = ({ auth, cart, lineItems, products, searchResults }) => {

  const userCartItems = lineItems.filter(item => {
    return item.order_id == cart.id && item;
  });

  const totalLineItems = userCartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return {
    user: auth.user,
    totalLineItems,
    products,
    searchResults
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    createSearchResult: (product) => dispatch(createSearchResult(product)),
    deleteSearchResult: (product) => dispatch(deleteSearchResult(product))
  };
};

export default connect(mapStateToProps, mapDispatch)(Nav);
