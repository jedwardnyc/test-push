import React from 'react';
import { connect } from 'react-redux';
import { addLineItemToCart, createLineItem, keepLoggedIn, createStarRating, deleteStarRating } from '../../store';
import Rating from 'react-rating';
import Modal from 'react-responsive-modal';
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1, open: false, description: '', rating: 3 };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSaveModal = this.onSaveModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onDeleteRating = this.onDeleteRating.bind(this);
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onChangeStar(rating) {
    this.setState({ rating: rating });
  }

  onSaveModal(ev) {
    ev.preventDefault();
    const review = {
      rating: this.state.rating,
      description: this.state.description,
      product_id: this.props.id,
      user_id: this.props.user.id
    };
    this.props.createStarRating(review);
    this.onCloseModal();
    this.setState({ rating:1, description: '', product_id: '', user_id: '' });
  }

  onDeleteRating(id) {
    const ratingUser = this.props.starRatings.filter(starRating => starRating.user_id === this.props.user.id).find(rating => rating.id === id);
    if (ratingUser) {
      if (ratingUser.id === id) {
        this.props.deleteStarRating({ id });
      }
    }
  }

  onSave(ev) {
    const lineItem = { quantity: this.state.quantity, product_id: this.props.id, order_id: this.props.cart.id };
    this.props.addLineItemToCart(lineItem)
    .then(() => {
      this.props.history.push('/cart')
    });
  }

  render() {
    const { open, description, rating } = this.state;
    const { product, quantityOptions, user, starRatings, ratingUsers, starRatingUser, starRatingProduct, ratingFilteredProducts } = this.props;
    const { onSave, onChange } = this;

    if (!product) {
      return null;
    }
    if (!user) {
      return null;
    }
    return (
      <div className='container'>
        <div className='border rounded mt-5 bg-light row'>
          <div className='col-sm'>
            <img className='img-fluid mt-4 mb-4' src={product.imgUrl} width='400' height='200' />
          </div>
          <div className='col-sm'>
            <h3 className='text-left pt-3 pb-3'>{product.name}</h3>
            <h5 className='mt-3 mb-3'>Price: ${product.price}</h5>
            <div className='card'>
              <div className='card-body rounded'>
                <div className='row'>
                  <div className='col sm-12 med-6'>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <label className='input-group-text' htmlFor='inputQuantity'>Quantity</label>
                      </div>
                      <select className='custom-select p-2 mr-2' id='inputQuantity' name='quantity' onChange={onChange}>
                        {
                          quantityOptions.map(option => {
                            return (
                              option
                            );
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className='col sm-12 med-6'>
                    <button className='btn btn-primary float-right' disabled={!product.availability} onClick={onSave}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4 mb-4'><div className='h5'>Description:</div> {product.description}</div>
            <div className='h4 mt-4 mb-4 text-danger'>{!product.availability ? 'Currently Unavailable' : ''}</div>
            <div className='col-md-10' />
            <button disabled={starRatingUser && starRatingProduct} className='btn btn-primary btn-md ml-4 mb-2 float-right' onClick={() => this.onOpenModal()}>Review</button>
          </div>
        </div>
        <Modal
          open={open}
          onClose={() => this.onCloseModal()}
          center
          classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
        >
          <div className='bg-light'>
            <h4 className='text-center'>Review</h4>
            <form className='form-group'>
              <div className='mr-auto p-2'>
                <p>Name: {product.name}</p>
                <Rating
                  name='rating'
                  initialRating={this.state.rating}
                  onChange={(rating) => this.onChangeStar(rating)}
                  value={rating}
                  emptySymbol={<img src='/public/icons/star-gray.png' className='icon' />}
                  fullSymbol={<img src='/public/icons/star-yellow.png' className='icon' />}
                />
              </div>
              <textarea
                name='description'
                className='form-control'
                onChange={onChange}
                value={description}
                rows='4'
              />
              <button className='btn btn-primary btn-lg mt-2 float-right' onClick={this.onSaveModal}>save</button>
            </form>
          </div>
        </Modal>
        <div className='mt-3'>
          {
            ratingFilteredProducts ?
              ratingFilteredProducts && ratingFilteredProducts.map(starRating => {
                return (
                  <div className='column' key={starRating.id}>
                    {/*<p>{ratingUsers[user.id]}</p>*/}
                    <Rating
                      initialRating={starRating.rating}
                      readonly
                      emptySymbol={<img src='/public/icons/star-gray.png' className='icon' />}
                      fullSymbol={<img src='/public/icons/star-yellow.png' className='icon' />}
                    />
                    <button onClick={() => this.onDeleteRating(starRating.id)} type='button' className='close' aria-label='Close'>
                      <span aria-hidden='true'>&times;</span>
                    </button>
                    <p className='p-2'>{starRating.description}</p>

                  </div>
                );
              })
              : ''
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, products, cart, starRatings, users }, { id }) => {

  const user = auth.user;
  const product = products.find(product => product.id === id);

  const starRatingUser = starRatings.find(starRating => starRating.user_id === user.id);
  const starRatingProduct = starRatings.find(starRating => starRating.product_id === product.id);
  const ratingFilteredProducts = starRatings.filter(starRating => starRating.product_id === product.id);

  const quantityOptions = [];
  for (let i = 1; i <= 20; i++) {
    quantityOptions.push(<option value={i} key={i}>{i}</option>);
  }

  // const ratingUsers = starRatings.reduce((result, starRating) => {
  //   const userId = starRating.user_id;
  //   const userName = users.find(user => user.id === userId).fullname;

  //   if(!result[userId]){
  //     result[userId] = userName;
  //   }
  //   return result;
  // }, {});

  return {
    user,
    product,
    cart,
    quantityOptions,
    starRatings,
    starRatingUser,
    starRatingProduct,
    ratingFilteredProducts
    //ratingUsers
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createLineItem: (lineItem) => dispatch(createLineItem(lineItem, history)),
    keepLoggedIn: () => dispatch(keepLoggedIn()),
    addLineItemToCart: lineItem => dispatch(addLineItemToCart(lineItem, history)),
    createStarRating: (review) => dispatch(createStarRating(review)),
    deleteStarRating: (starRating) => dispatch(deleteStarRating(starRating))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
