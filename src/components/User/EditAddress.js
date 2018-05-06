import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAddress, updateAddress } from '../../store';

class EditAddress extends Component {
  constructor(props){
    super(props);
    this.state = Object.assign({}, this.props.address, {add: false}, {edit: false}); 
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  update(ev){
    ev.preventDefault();
    this.props.updateAddress(this.state)
  }

  create(ev){
    ev.preventDefault();
    this.props.createAddress(this.state)
  }

  delete(address){
    this.deleteAddress(address)
  }

  render(){
    console.log(this.state)
    const { line1, line2, city, state, zip } = this.state || '';
    const { edit, add } = this.props;
    return (
      <form>
        <div className='address-form'>
          <div className='form-group'>
            <input 
              className='form-control' 
              placeholder='1234 Main St'
              value={ line1 }
              onChange={(ev) => this.setState({ line1: ev.target.value })}/>
          </div>
          <div className='form-group'>
            <input 
              className='form-control' 
              placeholder='Apartment or floor'
              value={ line2 } 
              onChange={(ev) => this.setState({ line2: ev.target.value })}/>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <input 
                className='form-control' 
                placeholder='City Town'
                value={ city }
                onChange={(ev) => this.setState({ city: ev.target.value })}/>
            </div>
            <div className='form-group col-md-2'>
              <input 
                className='form-control' 
                placeholder='CA'
                value={ state } 
                onChange={(ev) => this.setState({ state: ev.target.value })}/>
            </div>
            <div className='form-group col-md-4'>
              <input 
                className='form-control' 
                placeholder='12345'
                value={ zip }
                onChange={(ev) => this.setState({ zip: ev.target.value })}/>
            </div>
          </div>
        </div>
        <div className='address-add-buttons'>
          <button onClick={ edit ? this.update: this.create }
            className='btn btn-sm btn-secondary mr-1'> 
            { edit ? 'Edit Address' : 'Add Address' }
          </button>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createAddress: (address) => dispatch(createAddress(address)),
    updateAddress: (address) => dispatch(updateAddress(address))
  }
}

export default connect(null, mapDispatch)(EditAddress);