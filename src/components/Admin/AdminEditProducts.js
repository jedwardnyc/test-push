import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class AdminEditProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.productState(this.props);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  productState(props) {
    return {
      name: props.product ? props.product.name : '',
      price: props.product ? props.product.price : '',
      description: props.product ? props.product.description : '',
      imgUrl: props.product ? props.product.imgUrl : ''
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
    products
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditProducts);
