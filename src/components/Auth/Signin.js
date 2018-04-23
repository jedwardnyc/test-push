import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, signUp } from '../../store';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname:'',
      lastname:'',
      email: '',
      password: '',
    }
    this.submitSignin = this.submitSignin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }

  submitSignin(ev) {
    const { firstname, lastname, email, password } = this.state;
    ev.preventDefault();
    this.props.signin({ firstname, lastname, email, password })
  }

  render() {
    const { firstname, lastname, email, password } = this.state;

    return (
      <div className='row'>
        <div className='col-sm-4'></div>
        <div className='text-center bg-light border col-sm-4 p-3 mr-5 mt-5'>
          <img className='mb-4' src='/public/images/lightbulb.jpeg' width='72' height='72' />
          <h1 className='h3 mb-3 font-weight-normal'>Please Sign in</h1>
          <div>
            <form onSubmit={this.submitSignin} className='signin-container'>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>first name</span>
                  </div>
                  <input
                    placeholder='First Name'
                    onChange={this.onChange}
                    className='form-control'
                    required autoFocus
                    name='firstname'
                  />
                </div>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>last name</span>
                  </div>
                  <input
                    placeholder='Last Name'
                    onChange={this.onChange}
                    className='form-control'
                    required autoFocus
                    name='lastname'
                  />
                </div>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>@</span>
                  </div>
                  <input
                    placeholder='Email address'
                    onChange={this.onChange}
                    type='email'
                    className='form-control'
                    required autoFocus
                    name='email'
                  />
                </div>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>*</span>
                  </div>
                  <input
                    placeholder='Password'
                    onChange={this.onChange}
                    type='password'
                    className='form-control'
                    required
                    name='password'
                  />
                </div>
              </div>
              <button
                className='btn col-sm-4 btn-primary mb-5'>
                Create account
            </button>
            </form>
            <button
              className='btn btn-block btn-primary mt-3'>
              Sign in to existing account</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    login: credentials => dispatch(login(credentials, history)),
    signUp: credentials => dispatch(signUp(credentials, history))
  }
};

export default connect(null, mapDispatchToProps)(Signin);
