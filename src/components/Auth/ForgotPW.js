import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgot } from '../../store';

class ForgotPW extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      err: {},
      success: false
    }
    this.submit = this.submit.bind(this);
  }

  submit(ev) {
    const { email } = this.state;
    ev.preventDefault(); 
    this.props.forgot({ email });
    this.setState({ success: true })
  }

  render() {
    const { email, success } = this.state;
    
    return (
      <div className='row'>
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
                    Send reset insctructions
                  </button>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    )
  }
};

const mapDispatch = (dispatch) => {
  return {
    forgot: (email) => dispatch(forgot(email))
  }
};

export default connect(null, mapDispatch)(ForgotPW);