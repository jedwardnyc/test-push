import React from 'react';
import { connect } from 'react-redux';

class AdminUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.usersState(this.props);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  usersState(props) {
    return {
      id: this.props ? this.props.id : '',
      firstname: this.props ? this.props.firstname : '',
      lastname: this.props ? this.props.lastname : '',
      email: this.props ? this.props.email : '',
      password: this.props ? this.props.password : '',
      isAdmin: this.props ? this.props.isAdmin : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.usersState(nextProps))
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();

  }

  render() {
    const { users } = this.props;
    return (
      <div className='container'>
        <ul>
          { users.map(user => {
              return (
                <li>
                {user.fullname}
                </li>
              )
            })
          } 
        </ul>
        <div>
          <h4>delete a user</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
