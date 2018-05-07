import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCreditCard, updateCreditCard } from '../../store';

class EditCard extends Component {
  constructor(props){
    super(props);
    this.state = Object.assign({}, this.props.creditCard, { user_id: this.props.user.id }); 
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  update(ev){
    ev.preventDefault();
    this.props.updateCreditCard(this.state)
    this.props.edit({edit:false})
  }

  create(ev){
    ev.preventDefault();
    this.props.createCreditCard(this.state)
    this.props.add({add:false})
  }

  cancel(ev){
    ev.preventDefault();
    this.props.add ? this.props.add({add:false}) : this.props.edit({edit:false})
  }

  render(){
    
    const { number, firstname, lastname, exp } = this.state;
    const { edit } = this.props;
    return (
      <form onSubmit={ edit ? this.update : this.create }>
        <div className='address-form'>
          <div className='form-row'>
            <div className='form-group col-4'>
              <input 
                className='form-control' 
                placeholder='Janeathon'
                value={ firstname ? firstname : '' } 
                onChange={(ev) => this.setState({ firstname: ev.target.value })}/>
            </div>
            <div className='form-group col-4'>
              <input 
                className='form-control' 
                placeholder='Smithy'
                value={ lastname ? lastname : '' } 
                onChange={(ev) => this.setState({ lastname: ev.target.value })}/>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-4'>
              <input 
                className='form-control' 
                placeholder='1234 4678 9012 3456'
                value={ number ? number : '' } 
                onChange={(ev) => this.setState({ number: ev.target.value })}/>
            </div>
            <div className='form-group col-2'>
              <input 
                className='form-control' 
                placeholder='01/20'
                value={ exp ? exp : '' } 
                onChange={(ev) => this.setState({ exp: ev.target.value })}/>
            </div>
          </div>
          <div className='address-add-buttons'>
            <button 
              className='btn btn-sm btn-secondary mr-1'> 
              { edit ? 'Edit Card' : 'Add Card' }
            </button>
            <button onClick={this.cancel} 
              className='btn btn-danger btn-sm'> 
              Cancel 
            </button>
          </div>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createCreditCard: (creditCard) => dispatch(createCreditCard(creditCard)),
    updateCreditCard: (creditCard) => dispatch(updateCreditCard(creditCard))
  }
}

export default connect(null, mapDispatch)(EditCard);