import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';

//need to add user information. if no user then move to login page when clicking cart button.
const Nav = (props) => {
  const { auth, logout, getLoggedIn } = props;
  let { user } = props;
  if (!user) user = '';
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <NavLink className='navbar-brand' activeClassName='active' to='/'>
        <img src='/public/images/lightbulb.jpeg' width='30' height='30' className='mr-3 d-inline-block align-top' />
        The Light Web</NavLink>
      <div className='collapes navbar-collapse justify-content-end'>
        {
          auth ?
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink activeClassName='active' className='nav-link' to='/order'>Hello {user.firstname} </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink activeClassName='active' className='nav-link' to='/login' onClick={logout}>Log Out</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink activeClassName='active' className='nav-link' to='/order'>My Orders</NavLink>
            </li>
          </ul>
          :
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink activeClassName='active' className='nav-link' to='/login'>Sign in</NavLink>
            </li>
          </ul>
        }
        {/* <NavLink activeClassName='active' className='nav-link' to={ user ? '/cart' : '/login' }> */}
        <div className='dropdown'>
          <NavLink className='btn btn-outline-light dropdown-toggle' to='#' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Admin</NavLink>
          <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
            <NavLink className='dropdown-item' to='/admin/categories'>Categories</NavLink>
            <NavLink className='dropdown-item' to='/admin/products'>Products</NavLink>
            <div className='dropdown-divider'></div>
            <NavLink className='dropdown-item' to='/admin/addAdmin'>Add admin</NavLink>
            <NavLink className='dropdown-item' to='/admin/reset'>Reset password</NavLink>
          </div>
        </div>
        <NavLink activeClassName='active' className='nav-link' to='/cart'>
          <button className='btn btn-outline-light my-2 my-lg-0'>Cart (0)</button>
        </NavLink>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth.authenticated,
    user: auth.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatch)(Nav);
