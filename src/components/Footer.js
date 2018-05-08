import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Footer = () => {
  return (
    <footer className='bg-dark pt-4 mt-4 footer row'>
      <div className='col-sm-3 col-md-3 col-lg-3'>
        <h4 className='footer-text text-uppercase font-weight-bold text-center border-bottom mr-auto'>The Light Web</h4>
        <p className='footer-text text-center p-2'>Here introduces the website Here introduces the website Here introduces the website Here introduces the website Here introduces the website
        </p>
      </div>
      <div className='col-sm-3 col-md-3 col-lg-3'>
        <h4 className='footer-text text-uppercase font-weight-bold text-center border-bottom mr-auto'>The Light Web</h4>
      </div>
      <div className='col-sm-3 col-md-3 col-lg-3'>
        <h4 className='footer-text text-uppercase font-weight-bold text-center border-bottom mr-auto'>about us</h4>
        <div className='text-center'>
          <NavLink className='footer-text' to={''} >Baltazar Villegas</NavLink>
        </div>
        <div className='text-center'>
          <NavLink className='footer-text' to={''} >Jacob Rico</NavLink>
        </div>
        <div className='text-center'>
        <NavLink className='footer-text' to={''} >Chaehoon Lim</NavLink>
        </div>
      </div>
      <div className='col-sm-3 col-md-3 col-lg-3'>
        <h4 className='footer-text text-uppercase font-weight-bold text-center border-bottom mr-auto'>contact</h4>
      </div>
    </footer>
  );
}

export default Footer;
