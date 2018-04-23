import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, signUp } from '../../store';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.submitLogin = this.submitLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }

  submitLogin(ev) {
    const { email, password } = this.state;
    ev.preventDefault();
    this.props.login({ email, password })
  }

  render() {
    const { email, password } = this.state;
    const { signUp } = this.props;
    return (
      <div className='row'>
        <div className='col-sm-4'></div>
        <div className='text-center bg-light border col-sm-4 p-3 mr-5 mt-5'>
          <img className='mb-4' src='/public/images/lightbulb.jpeg' width='72' height='72' />
          <h1 className='h3 mb-3 font-weight-normal'>Please login in</h1>
          <div>
            <form onSubmit={this.submitLogin} className='signin-container'>
              <div className='form-group'>
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
                disabled={!email && !password}
                className='btn col-sm-4 btn-primary mb-5'>
                Log in
            </button>
            </form>
            <h4> Don't have an account? </h4>
            <h5> Please Sign up by clicking below! </h5>
            <button
              className='btn btn-block btn-primary mt-3'
              disabled={!email && !password} onClick={() => signUp({ email, password })}> Sign up </button>
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

export default connect(null, mapDispatchToProps)(Login);
