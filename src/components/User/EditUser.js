import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser } from '../../store'; 

class EditUser extends Component {
  constructor(props){
    super(props);
    this.state = this.props.user;
    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.user)
  }

  update(ev){
    ev.preventDefault();
    this.props.updateUser(this.state);
  }

  render(){
    const { firstname, lastname, email } = this.state || '';
    const { user } = this.props;
    console.log(this.state)
    if (!user) return null;
    return (
      <div className='container mt-3'>
        <div className='user-edit-header'>
          <div className='mb-2 user-edit-title'> Edit {user.firstname}'s Profile </div>
        </div>
        <form>
          <div className='user-edit'>
          <div className='form-row'>
            <div className='form-group col-6'>
              <input 
                className='form-control' 
                placeholder='Jane'
                value={ firstname }
                onChange={(ev) => this.setState({ firstname: ev.target.value })}/>
            </div>
            <div className='form-group col-6'>
              <input 
                className='form-control' 
                placeholder='Doe'
                value={ lastname } 
                onChange={(ev) => this.setState({ lastname: ev.target.value })}/>
            </div>
            </div>
            <div className='form-group'>
              <input 
                className='form-control' 
                placeholder='example@test.com'
                value={ email }
                onChange={(ev) => this.setState({ email: ev.target.value })}/>
            </div>
            <div className='user-edit-buttons'>
              <button 
                onClick={this.update}
                className='btn btn-sm btn-secondary'> 
                Edit Profile
              </button>
            </div>
          </div>
        </form>
        <Link to='/account'><button className='mt-4 btn btn-sm btn-dark'> Back to Account </button></Link>
      </div>
    )
  }
}

const mapState = ({ auth }) => {
  return {
    user: auth.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: user => dispatch(updateUser(user))
  }
}

export default connect(mapState, mapDispatch)(EditUser)