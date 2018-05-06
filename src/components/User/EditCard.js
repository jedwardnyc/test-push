const EditCard = (props) => {

  let { creditCard } = props;
  if (!creditCard) creditCard = ''
    return (
      <form className='cc-add-item'>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="1234 Main St" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Apartment or floor" />
        </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <input type="text" class="form-control" placeholder="City Town" />
        </div>
        <div class="form-group col-md-2">
          <input type="text" class="form-control" placeholder="CA" />
        </div>
        <div class="form-group col-md-4">
          <input type="text" class="form-control" placeholder="12345"/>
        </div>
        <button className='btn btn-sm btn-secondary cc-add-buttons'> Add Card </button>
      </div>
      </form>
    )
}

export default EditCard;