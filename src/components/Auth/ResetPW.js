import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from '../../store';
import axios from 'axios';


class ResetPW extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirm: '',
      err: {},
      success: false,
      show: false
    }
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset ({ password, token }) {
    const hashedPassword = bcrypt.hashSync( password , 8);
    return axios.post(`/auth/local/reset/${token}`, { password: hashedPassword })
    .catch(err => console.log(err))
  }

  submit(ev) {
    const { password } = this.state;
    const { token } = this.props;
    ev.preventDefault(); 
    this.reset({ password, token });
    this.setState({ success: true })
  }

  render() {
    const { passwordConfirm, password, success, show } = this.state;
    
    return (
      <div className='row'>
        <div className='col-sm-4'></div>
        {
          success ? 
          <div className='text-center bg-light border col-sm-4 p-3 mr-5 mt-5'> Your password has been reset! </div>
          :
          <div className='text-center bg-light border col-sm-4 p-3 mr-5 mt-5'>
            <div>
              <h3>Reset Your Password</h3>
              <br />
            </div>
            <div>
              <form onSubmit={this.submit} className='signin-container'>
                <div className='form-group'>
                  <div className='input-group mb-3'>
                    <input
                      placeholder='New Password'
                      onChange={(ev) => this.setState({ password: ev.target.value })}
                      type={ show ? 'text' : 'password' }
                      className='form-control'
                      required autoFocus
                      name='password'
                    />
                  </div>
                  <div className='input-group mb-3'>
                    <input
                      placeholder='Confirm Password'
                      onChange={(ev) => this.setState({ passwordConfirm: ev.target.value })}
                      type={ show ? 'text' : 'password' }
                      className={`form-control ${passwordConfirm ? password !== passwordConfirm ? 'is-invalid' : 'is-valid ' : ''}`}
                      required
                      name='passwordConfirm'
                    />
                    <div className='valid-feedback'>
                      Passwords match!
                    </div>
                    <div className='invalid-feedback'>
                      Passwords must match!
                    </div>
                  </div>
                  <button
                    disabled={!passwordConfirm || passwordConfirm !== password}
                    className='btn btn-block btn-primary mt-3'>
                    Reset Password
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

const mapState = ({}, { token }) => {
  return {
    token
  }
};

export default connect(mapState)(ResetPW);