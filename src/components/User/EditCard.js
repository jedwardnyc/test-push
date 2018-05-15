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
    this.props.edit({ edit:false, id: undefined })
  }

  create(ev){
    ev.preventDefault();
    this.props.createCreditCard(this.state)
    this.props.add({ add:false, id: undefined })
  }

  cancel(ev){
    ev.preventDefault();
    this.props.add ? this.props.add({ add:false, id: undefined }) : this.props.edit({ edit:false, id: undefined })
  }

  render(){
    
    const { number, firstname, lastname, exp } = this.state;
    const { edit, add } = this.props;
    return (
      <div className='cc-item'>
        <form onSubmit={ edit ? this.update : this.create }>
          <div className='form-row'>
            <div className='form-group col-6'>
              <input 
                className='form-control' 
                placeholder='Janeathon'
                value={ firstname ? firstname : '' } 
                onChange={(ev) => this.setState({ firstname: ev.target.value })}/>
            </div>
            <div className='form-group col-6'>
              <input 
                className='form-control' 
                placeholder='Smithy'
                value={ lastname ? lastname : '' } 
                onChange={(ev) => this.setState({ lastname: ev.target.value })}/>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-8'>
              <input 
                className='form-control' 
                placeholder='1234 4678 9012 3456'
                value={ number ? number : '' } 
                onChange={(ev) => this.setState({ number: ev.target.value })}/>
            </div>
            <div className='form-group col-4'>
              <input 
                className='form-control' 
                placeholder='01/20'
                value={ exp ? exp : '' } 
                onChange={(ev) => this.setState({ exp: ev.target.value })}/>
            </div>
          </div>
        </form>
          {
            edit || add ?
            <div className='cc-buttons'>
              <button
                onClick={ edit ? this.update : this.create }
                className='btn btn-sm btn-secondary mr-1'> 
                { edit ? 'Edit Card' : 'Add Card' }
              </button>
              <button onClick={this.cancel} 
                className='btn btn-danger btn-sm'> 
                Cancel 
              </button>
            </div>
            : null
          }
      </div>
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