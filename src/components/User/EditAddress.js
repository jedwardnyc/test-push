import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAddress, updateAddress } from '../../store';

class EditAddress extends Component {
  constructor(props){
    super(props);
    this.state = Object.assign({}, this.props.address, { user_id: this.props.user.id }); 
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  update(ev){
    ev.preventDefault();
    this.props.updateAddress(this.state);
    this.props.edit({ edit: false, id: undefined });
  }

  create(ev){
    ev.preventDefault();
    this.props.createAddress(this.state);
    this.props.add({ add: false, id: undefined });
  }

  cancel(ev){
    ev.preventDefault();
    this.props.add ? this.props.add({ add: false, id: undefined }) : this.props.edit({ edit: false, id: undefined });
  }

  render(){
    
    const { line1, line2, city, state, zip } = this.state;
    const { edit } = this.props;
    return (
      <div className='add-item'>
        <form onSubmit={ edit ? this.update : this.create }>
          <div className='address-form'>
            <div className='form-group'>
              <label> Street Address </label>
              <input 
                className='form-control' 
                placeholder='1234 Main St'
                value={ line1 ? line1 : '' }
                onChange={(ev) => this.setState({ line1: ev.target.value })}/>
            </div>
            <div className='form-group'>
              <label> Apt/Floor/Suite </label>
              <input 
                className='form-control' 
                placeholder='Apartment or floor'
                value={ line2 ? line2 : '' } 
                onChange={(ev) => this.setState({ line2: ev.target.value })}/>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label> City </label>
                <input 
                  className='form-control' 
                  placeholder='City Town'
                  value={ city ? city : '' }
                  onChange={(ev) => this.setState({ city: ev.target.value })}/>
              </div>
              <div className='form-group col-md-2'>
                <label> State </label>
                <input 
                  className='form-control' 
                  placeholder='CA'
                  value={ state ? state : '' } 
                  onChange={(ev) => this.setState({ state: ev.target.value })}/>
              </div>
              <div className='form-group col-md-4'>
                <label> Zip </label>
                <input 
                  className='form-control' 
                  placeholder='12345'
                  value={ zip ? zip : '' }
                  onChange={(ev) => this.setState({ zip: ev.target.value })}/>
              </div>
            </div>
          </div>
        </form>
        <div className='address-add-buttons'>
          <button 
            onClick={ edit ? this.update : this.create } 
            className='btn btn-sm btn-secondary mr-1'> 
            { edit ? 'Edit Address' : 'Add Address' }
          </button>
          <button onClick={this.cancel} 
            className='btn btn-danger btn-sm'> 
            Cancel 
          </button>
        </div>
      </div>
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