import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkOutUser } from '../store/cart';
import ShoppingList from './ShoppingList';

class Purchase extends Component {
  constructor() {
    super();
    this.onPlaceOrder = this.onPlaceOrder.bind(this);
  }

  onPlaceOrder(ev) {
    if (this.props.userCartItems.length) {
      this.props.checkOutUser(this.props.userId);
    } else {
      console.log('This will not get called if submit is disabled');
    }
  }

  render() {
    const { onPlaceOrder } = this;
    const { userCartItems } = this.props;
    return (
      <div className="container-fluid m-4">
        <div className="row">
          <div className="col-sm-9">
            <div className="h1 border-bottom border-gray pb-2 mb-0">Checkout</div>
            <div id="accordion">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    1 &mdash; Shipping address
                    </button>
                  </h5>
                </div>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    2 &mdash; Payment method
                    </button>
                  </h5>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                  <div className="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      3 &mdash; Review items
                    </button>
                  </h5>
                </div>
                <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
                  <div className="card-body">
                    <ShoppingList />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3 text-center">
            <div className="card card-side bg-light">
              <div className="card-body">
                <p className="card-text"><button className="btn btn-block btn-primary p-2" onClick={ onPlaceOrder } disabled={ !userCartItems.length }>Purchase</button></p>
                <h5 className="card-title">Order summary:</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, lineItems }) => {

  // not checking orders b/c cart always status = 'CART'
  const userCartItems = lineItems.filter(item => {
    return item.order_id == cart.id && item;
  });

  // getting user id from cart to check out
  const userId = cart.user_id;
  return {
    userCartItems,
    userId
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    checkOutUser: userId => dispatch(checkOutUser(userId, history))
    .then(() => history.push('/products'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
