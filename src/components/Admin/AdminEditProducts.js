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

    const { products, product } = this.props;
    if(!product) {
      return null;
    }
    return (
      <div className="container border rounded mt-5 ml-5 bg-light col-sm-10 row">
        <div className="col-sm-6">
          <img className="mr-auto p-3" src={product.imgUrl} width="500" height="400" />
        </div>
        <div className="col-sm-6">
          <h3 className="text-center p-3">{product.name}</h3>
          <br />
          <div className="rounded mr-1 row">
            <h5 className="mr-1">Price: ${product.price}</h5>
          </div>
          <br />
          <h5 className="border-top p-2 mr-1">Description: {product.description}</h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }, { id }) => {

  const product = products.find(product => product.id === id);
  return {
    products,
    product
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditProducts);
