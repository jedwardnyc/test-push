import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';
import fontawesome from '@fortawesome/fontawesome';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


class Nav extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    fontawesome.library.add(faShoppingCart);


    const { totalLineItems, logout } = this.props;
    let { user } = this.props;

    if (!user) user = {};
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className='text-center navbar-brand' activeclassname='active' to='/'>
          <img src='/public/icons/TLW-icon-light.svg' width='40' height='50' className='mr-3 d-inline-block' />
          The Light Web</Link>
        <div>

        </div>
        <div className='collapes navbar-collapse justify-content-end'>
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
    );
  }
};

const mapStateToProps = ({ auth, cart, lineItems }) => {

  const userCartItems = lineItems.filter(item => {
    return item.order_id == cart.id && item;
  });

  const totalLineItems = userCartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return {
    user: auth.user,
    totalLineItems
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatch)(Nav);
