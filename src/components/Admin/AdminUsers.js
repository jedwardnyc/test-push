import React from 'react';
import { connect } from 'react-redux';

class AdminUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.productState(this.props);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  productState(props) {
    return {

    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.productState(nextProps))
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
        <hr />
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
