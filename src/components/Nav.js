import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';
import fontawesome from '@fortawesome/fontawesome';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const Nav = (props) => {

  fontawesome.library.add(faShoppingCart);
  fontawesome.library.add(faSearch);

  const { lineItemsLength, logout } = props;
  let { user } = props;
  if (!user) user = {};
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="text-center navbar-brand" activeclassname="active" to="/">
        <img src="/public/icons/TLW-icon-light.svg" width="40" height="50" className="mr-3 d-inline-block" />
        The Light Web</Link>
      <div className="collapes navbar-collapse justify-content-end">
        {
          user.id ?
          <ul className="navbar-nav">
            <div className="dropdown">
              <Link className="nav-link" to="#" role="button" data-toggle="dropdown">
                Hello {user.firstname}</Link>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to="/account"> My Account </Link>
                <Link className="dropdown-item" to="/account/orders"> My Orders </Link>
                <Link className="dropdown-item" to="/account/edit-profile"> Edit Profile </Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/login" onClick={logout}> Log Out </Link>
              </div>
            </div>
            {
              user.isAdmin ?
              <div className="dropdown spacer">
                <Link className="btn btn-outline-light dropdown-toggle" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin</Link>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <Link className="dropdown-item" to="/admin/categories">Edit Categories</Link>
                  <Link className="dropdown-item" to="/admin/products">Edit Products</Link>
                  <div className="dropdown-divider" />
                  <Link className="dropdown-item" to="/admin/users">Edit Users</Link>
                </div>
              </div>
              : null
            }
          </ul>
          :
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Sign in</Link>
            </li>
          </ul>
        }
        <Link className="nav-link" to="/cart">
          <button className="btn btn-outline-light my-2 my-lg-0">{<FontAwesomeIcon icon={faShoppingCart} />} ({ lineItemsLength })</button>
        </Link>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth, cart }) => {
  let lineItemsLength;
  if (cart.line_items) {
    lineItemsLength = cart.line_items.length;
  } else {
    lineItemsLength = 0;
  }
  return {
    user: auth.user,
    lineItemsLength
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatch)(Nav);
