import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, getLoggedIn } from '../store';

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
<<<<<<< HEAD
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink activeClassName='active' className='nav-link' to='/login'>Sign in</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink activeClassName='active' className='nav-link' to='/order'>Orders</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink activeClassName='active' className='nav-link' to='/admin'>Admin</NavLink>
          </li>
        </ul>
=======
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
>>>>>>> fd463aa18c168afff70320ca1bac2bffda12f5db
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

<<<<<<< HEAD
export default connect(mapStateToProps)(Nav);

/*<div className='dropdown'>
          <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Admin
          </button>
          <div className='dropdown-menu'>
            <NavLink className='dropdown-item' to='admin/products'>products</NavLink>
            <NavLink className='dropdown-item' to='admin/categories'>Categories</NavLink>
            <NavLink className='dropdown-item' to='admin/users'>Customers</NavLink>
          </div>
        </div> */
=======
const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getLoggedIn: (user) => dispatch(getLoggedIn(user))
  }
}

export default connect(mapStateToProps, mapDispatch)(Nav);
>>>>>>> fd463aa18c168afff70320ca1bac2bffda12f5db
