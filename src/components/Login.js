import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, signUp } from '../../store';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.submitLogin = this.submitLogin.bind(this);
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
      <div>
        <h1> Log in </h1>
        <div>
          <form onSubmit={this.submitLogin} className="signin-container">
            <div className="form-group">
              <label>E-Mail:</label>&nbsp;
              <input
                onChange={(ev) => this.setState({ email: ev.target.value })}
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Password: </label>&nbsp;
              <input
                onChange={(ev) => this.setState({ password: ev.target.value })}
                type="password"
                className="form-control"
                required
              />
            </div>
            <button 
              disabled={!email && !password} 
              className="btn btn-block btn-primary"> 
                Log in 
            </button>
          </form>
          <h4> Don't have an account? </h4> 
          <h5> Sign up by filling out the above fields and clicking below! </h5>
          <button disabled={!email && !password} onClick={() => signUp({ email, password })}> Sign up </button>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch, { history }) => { 
  return {
    login: credentials => dispatch(login(credentials, history)),
    signUp: credentials => dispatch(signUp(credentials, history))
  } 
};

export default connect(null,mapDispatchToProps)(Login);