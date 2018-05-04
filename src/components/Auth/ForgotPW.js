import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgot } from '../../store';

export default class ForgotPW extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      err: {},
      success: false,
      show: false
    }
    this.submit = this.submit.bind(this);
    this.forgot = this.forgot.bind(this);
  }

  forgot(email) {
    return axios.post('/auth/local/forgot', email)
    .catch(err => console.log(err))
  }

  submit(ev) {
    const { email } = this.state;
    ev.preventDefault(); 
    this.forgot({ email });
    this.setState({ success: true })
  }

  render() {
    const { email, success } = this.state;
    
    return (
      <div id='forgot' className='row'>
        <div className='col-sm-4'></div>
        {
          success ? 
          <div className='text-center bg-light border col-sm-4 p-3 mr-5 mt-5'> Password reset email has been sent! </div>
          :
          <div className='text-center bg-light border col-sm-4 p-3 mr-5 mt-5'>
            <div>
              <h3>Forgot your password?</h3>
              <h5>Enter your email to get instructions on how to reset your password...</h5>
              <br />
            </div>
            <div>
              <form onSubmit={this.submit} className='signin-container'>
                <div className='form-group'>
                  <div className='input-group mb-3'>
                    <input
                      placeholder='Email address'
                      onChange={(ev) => this.setState({ email: ev.target.value })}
                      type='email'
                      className='form-control'
                      required autoFocus
                      name='email'
                    />
                  </div>
                  <button
                    disabled={!email}
                    className='btn btn-block btn-primary mt-3'>
                    Send reset instructions
                  </button>
                </div>
              </form>
              <Link to='/login'> Back to login </Link>
            </div>
          </div>
        }
      </div>
    )
  }
};
