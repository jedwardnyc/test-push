import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { deleteUser, updateUser } from '../../store';

class AdminUsers extends React.Component {
  constructor(props) {
    super(props)
    this.forgot = this.forgot.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);
  }

  forgot(email) {
    return axios.post('/auth/local/adminReset', email)
    .catch(err => console.log(err))
  }

  makeAdmin(user){
    const admin = user.isAdmin ? false : true
    this.props.updateUser({ id: user.id, isAdmin: admin })
  }

  render() {
    const { users } = this.props;
    return (
      <div className='container'>
        <div className='mt-3 mr-auto'>
            <h2>Edit Users</h2>
        </div>
        <ul className='list-group list-margin'>
        <div className='list-item'>
          <div className='list-header'>
            <div className='list-name'>Name</div>
            <div className='list-email'><strong>Email</strong></div>
          </div>
        </div>
        {
            users && users.map(user => {
              return (
                user &&
                <div className='list-item' key={user.id}>
                  <div className='list-info'>
                    <div className='list-name'>{user.fullname}</div>
                    <div className='list-email'>{user.email}</div>
                  </div>
                  <div className='list-btns'>
                    <button 
                      onClick={() => this.forgot({ email: user.email }) }
                      className='btn btn-sm btn-secondary list-btn'>
                        Reset Password
                    </button>
                    <button
                      onClick={() => this.makeAdmin( user ) }   
                      className={`btn btn-sm btn-${ user.isAdmin ? 'danger' : 'success' } list-btn`}> 
                        { user.isAdmin ? 'Remove Admin' : 'Make Admin' } 
                    </button>
                    <button onClick={() => this.props.deleteUser(user)} type='button' className='close list-btn'>
                    <span>&times;</span>
                    </button>
                  </div>
                </div>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (user) => dispatch(deleteUser(user)),
    updateUser: (user) => dispatch(updateUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
