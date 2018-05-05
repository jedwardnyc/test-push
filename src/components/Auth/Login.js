import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, signUp, getLoggedIn, fetchUsers } from '../../store';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordStrength: 'Weak',
      firstname: '',
      lastname: '',
      err: '',
      signup: false
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  onChange(ev) {
    if (ev.target.name === 'password'){
      this.setState({ password: ev.target.value });
      this.validatePassword(ev.target.value);
    }
    this.setState({ [ev.target.name]: ev.target.value });
    console.log(this.state.passwordStrength)

  }

  componentWillUnmount(){
    const user = localStorage.getItem('user');
    if (user) {
      this.props.getLoggedIn({ token: user })
      .then(_user => {
        if(_user.isAdmin){
          console.log(_user)
          this.props.fetchUsers();
        }
      })
    }
  }

  validatePassword(password) {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

    return (
      this.setState({ passwordStrength:
        strongRegex.test(password) ?
        'Strong'
        : mediumRegex.test(password) ?
        'Medium'
        : 'Weak'
      })
    );
  }

  submit(ev) {
    const { email, password, firstname, lastname, signup } = this.state;
    ev.preventDefault();
    signup ? 
    this.props.signUp({ firstname, lastname, password, email }) 
      .catch(err => this.setState({ err: err.response }))
    : this.props.login({ email, password })
      .catch(err => this.setState({ err: err.response }))
  }

  render() {
    const { email, password, firstname, lastname, signup, passwordStrength, err } = this.state;
    return (
      <div id='login' className='row'>
        <div className='col-sm-4'></div>
        <div className='text-center bg-light border col-sm-4 p-3 mr-5 mt-5'>
          <img src='/public/icons/TLW-icon-dark.svg' width='120' height='160' />
          { signup ?
            <h1 className='h3 mb-3 font-weight-normal'>Create an account</h1>
            :
            <h1 className='h3 mb-3 font-weight-normal'>Please login in</h1>
          }
          <div>
            <form onSubmit={this.submit} className='signin-container'>
            {
              signup ?
              <div>
                <div className='input-group mb-3'>
                  <input
                    placeholder='First Name'
                    onChange={this.onChange}
                    className='form-control'
                    required autoFocus
                    name='firstname'
                  />
                </div>
                <div className='input-group mb-3'>
                  <input
                    placeholder='Last Name'
                    onChange={this.onChange}
                    className='form-control'
                    required autoFocus
                    name='lastname'
                  />
                </div>
            </div>
            : null
            }
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <input
                    placeholder='Email address'
                    onChange={this.onChange}
                    type='email'
                    className={`form-control ${err ? 'is-invalid' : ''}`}
                    required autoFocus
                    name='email'
                  />
                  <div className='invalid-feedback'>
                      { signup ? 'User Already Exists. Please sign in!' : 'No User was found with that email!' }
                  </div>
                </div>
                <div className='input-group mb-3'>
                  <input
                    placeholder='Password'
                    onChange={this.onChange}
                    type='password'
                    className='form-control'
                    required
                    name='password'
                  />
                  {
                    signup ?
                    <div
                      id='password'
                      className={`badge badge-${ passwordStrength === 'Weak' ? 'danger'
                        : passwordStrength === 'Medium' ? 'warning'
                        : 'success'}`}>
                      {passwordStrength}
                    </div>
                    : null
                  }
                </div>
              </div>
              <button
                disabled={(!email) || (!password) || ( signup ? passwordStrength==='Weak': null)}
                className='btn col-sm-4 btn-primary mb-2'>
                { signup ? 'Sign up' : 'Log in' }
              </button>
            </form>
            {
              signup ? null :
              <div className='mb-2'>
                <Link to='/forgot'> Forgot Password? </Link>
              </div>
            }
            <hr />
            {
              signup ? 
              <div>
                <h4> Have an account? </h4>
                <button
                  className='btn btn-block btn-primary mt-3 mb-4'
                  onClick={(ev)=> {
                    ev.preventDefault();
                    this.setState({ signup: false })}}> Log in </button>
              </div>
              :
              <div>
                <h4> Don't have an account? </h4>
                <h6> Please Sign up by clicking below! </h6>
                <button
                  className='btn btn-block btn-primary mt-3 mb-4'
                  onClick={(ev)=> {
                    ev.preventDefault();
                    this.setState({ signup: true })}}> Sign up </button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    login: credentials => dispatch(login(credentials, history)),
    signUp: credentials => dispatch(signUp(credentials, history)),
    getLoggedIn: user => dispatch(getLoggedIn(user)),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(null, mapDispatchToProps)(Login);
