import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

//need to add user information. if no user then move to login page when clicking cart button.
const Nav = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <NavLink className='navbar-brand' activeClassName='active' to='/'>
        <img src='/public/images/lightbulb.jpeg' width='30' height='30' className='mr-3 d-inline-block align-top' />
        The-light-web</NavLink>
      <div className='collapes navbar-collapse justify-content-end'>
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
        <NavLink activeClassName='active' className='nav-link' to='/cart'>
          <button className='btn btn-outline-light my-2 my-lg-0'>Cart (0)</button>
        </NavLink>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ users }) => {
  return {
    //user: users.find( user => user.id === ??)
  }
}

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
