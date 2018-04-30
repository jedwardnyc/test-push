import React from 'react';
import { connect } from 'react-redux';
import { createLineItem, addToCart, keepLoggedIn } from '../store';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();
    const lineitem = { quantity: this.state.quantity, product_id: this.props.id }
    this.props.createLineItem(lineitem);
  }

  // not doing anything -bv
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ quantity: nextProps.lineitem ? nextProps.lineitem.quantity : 1});
  // }

  addToCart(ev) {
    this.props.addToCart(
      this.props.product.id,
      this.state.quantity
      // user id
    );
  }

  render() {
    const { product } = this.props;
    const { onSave, addToCart, onChange } = this;

    // quantity drop down values
    const options = [];
    for (let i = 1; i <= 20; i++) {
      options.push(<option value={i} key={i}>{i}</option>);
    }

    if (!product) {
      return null;
    }
    return (
      <div className="container border rounded mt-5 ml-5 bg-lightr row">
        <div className="col-sm">
          <img className="img-fluid mt-4 mb-4" src={product.imgUrl} />
        </div>
        <div className="col-sm">
          <h3 className="text-left pt-3 pb-3">{product.name}</h3>
          <h5 className="mt-3 mb-3">Price: ${product.price}</h5>
          <div className="card">
            <div className="card-body rounded">
              <div className="row">
                <div className="col sm-12 med-6">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <label className="input-group-text" htmlFor="inputQuantity">Quantity</label>
                    </div>
                    <select className="custom-select p-2 mr-2" id="inputQuantity" name="quantity" onChange={ onChange }>
                      {
                        options.map(option => {
                          return (
                            option
                          );
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="col sm-12 med-6">
                  <button className="btn btn-primary float-right" onClick={ addToCart }>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 mb-4 "><div className="h5">Description:</div> {product.description}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }, { id }) => {
  return {
    product: products.find(product => product.id === id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLineItem: (lineitem) => dispatch(createLineItem(lineitem, history)),
    keepLoggedIn: () => dispatch(keepLoggedIn()),
    addToCart: ( productId, quantity ) => dispatch(addToCart(productId, quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
