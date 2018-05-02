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
      isAdmin: this.props ? this.props.fisAdmin : ''
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
    return (
      <div className='container'>
        <div>
          <h4>Promote an user to admin</h4>
        </div>
        <div>
          <h4>delete a user</h4>
        </div>
        <div>
          <h4>trigger password reset for a user (that is, the next time they successfully log in with their old password, they are prompted for a new one), so that I can be proactive in getting users to change their passwords after a period of time</h4>
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
