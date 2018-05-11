import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Orders = ({ userOrders, user, lineItems, productMap }) => {
  if (!user) return null;
  return (
    <div className="container-fluid m-4 orders">
      <div className="h1 pb-2"> Your Orders</div>
      {
        userOrders && userOrders.map(order => {
          const orderItems = lineItems.filter(item => item.order_id == order.id);
          const orderTotal = orderItems.reduce((sum, item) => {
            if (productMap[item.product_id]) {
              const productPrice = productMap[item.product_id].price;
              sum += productPrice * item.quantity;
            }
            return sum;
          }, 0);
          return (
            <div key={ order.id } className="card mr-5 mb-3">
              <div className="card-header">
                <div className="row">
                  <div className="col-sm-8">
                    <strong>Order #: { order.id }</strong> placed on <strong>{ Date(order.dateOrdered) }</strong>
                  </div>
                  <div className="col-sm-4 text-right">
                    <strong>Total: ${ orderTotal.toLocaleString('USD') }</strong>
                  </div>
                </div>
              </div>
              {
                orderItems && orderItems.map(item => {
                  const product = productMap[item.product_id];
                  return (
                    <div key={ item.id } className="card-body border-bottom">
                      <div className="row">
                        <div className="col-sm-2">
                          <Link to={`/products/${product.id}`}><img src={ product.imgUrl } className="img-fluid" /></Link>
                        </div>
                        <div className="col-sm-6">
                        <Link to={`/products/${product.id}`} className="h5">{ product.name }</Link>
                        </div>
                        <div className="col-sm-2">
                          ${ product.price.toLocaleString('USD') } x { item.quantity }
                        </div>
                        <div className="col-sm-2">
                          <button className="mt-4 btn btn-sm btn-primary float-right">Buy it again</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            );
          })
        }
        <Link to="/account"><button className="mt-4 btn btn-sm btn-dark"> Back to Account </button></Link>    </div>
  );
};

const mapState = ({ auth, orders, lineItems, products }) => {
  const userOrders = orders.filter(order => {
    if (auth.user) {
      return order.status === 'ORDERED' && order.user_id == auth.user.id;
    }
  });

  const productMap = products.reduce((map, product) => {
    map[product.id] = product;
    return map;
  }, {});

  return {
    userOrders,
    lineItems,
    productMap,
    user: auth.user
  };
};

export default connect(mapState)(Orders);
