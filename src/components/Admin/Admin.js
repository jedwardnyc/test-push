import React from 'react';
import { NavLink } from 'react-router-dom';

const Admin = ({ path }) => {
  return (
    <div className='container mt-3 col-md-10'>
      <ul className='nav nav-tabs justify-content-end'>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/admin'>Admin</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/admin/categories'>Categories</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/admin/products'>Products</NavLink>
        </li>
        <li className='nav-item dropdown'>
          <NavLink className='nav-link dropdown-toggle' data-toggle='dropdown' to='' role='button' aria-haspopup='true' aria-expanded='false'>Users</NavLink>
          <div className='dropdown-menu'>
            <NavLink className='dropdown-item' to='/admin/addAdmin'>Add Admin</NavLink>
            <NavLink className='dropdown-item' to='/admin/reset'>Reset User Password</NavLink>
          </div>
        </li>
      </ul>
      {
        path === '/admin' ? (
          <div className='mt-2'>
            <h2 className='text-center'>Welcome to Admin page</h2>
          </div>
        ) : (
          <br />
        )
      }
    </div>
  );
}

export default Admin;
