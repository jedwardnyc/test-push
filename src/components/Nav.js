import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';
import fontawesome from '@fortawesome/fontawesome';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

//need to add user information. if no user then move to login page when clicking cart button.
const Nav = (props) => {

  fontawesome.library.add(faShoppingCart);
  fontawesome.library.add(faSearch);

  const { logout, getLoggedIn } = props;
  let { user } = props;
  if (!user) user = {};
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link className='navbar-brand' activeclassname='active' to='/'>
        <img src='/public/images/lightbulb.jpeg' width='30' height='30' className='mr-3 d-inline-block align-top' />
        The Light Web</Link>
      <div className='collapes navbar-collapse justify-content-end'>
        {
          user.id ?
          <ul className='navbar-nav'>
            <div className='dropdown'>
              <Link className='nav-link' to='#' role='button' data-toggle='dropdown'>
                Hello {user.firstname}</Link>
              <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                <Link className='dropdown-item' to='/orders'> My Orders </Link>
                <Link className='dropdown-item' to={`/user/${user.id}`}> My Account </Link>
                <div className='dropdown-divider'></div>
                <Link className='dropdown-item' to='/login' onClick={logout}> Log Out </Link>
              </div>
            </div>
            {/* <li className='nav-item'>
              <Link activeclassname='active' className='btn btn-outline-light' to='/order'>Hello {user.firstname} </Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link activeclassname='active' className='btn btn-outline-light' to='/login' onClick={logout}>Log Out</Link>
            </li> */}
            {
              user.isAdmin ?
              <div className='dropdown spacer'>
                <Link className='btn btn-outline-light dropdown-toggle' to='#' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                Admin</Link>
                <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                  <Link className='dropdown-item' to='/admin/categories'>Categories</Link>
                  <Link className='dropdown-item' to='/admin/products'>Products</Link>
                  <div className='dropdown-divider'></div>
                  <Link className='dropdown-item' to='/admin/users'>Users</Link>
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
          <button className='btn btn-outline-light my-2 my-lg-0'>{<FontAwesomeIcon icon={faShoppingCart} />} (0)</button>
        </Link>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatch)(Nav);
