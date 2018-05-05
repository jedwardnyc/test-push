import React, { Component } from 'react';
import { connect } from 'react-redux';

const CreditCards = (props) => {

  const { creditCards, user } = props;

  const cardType = (card) => {

    const masterCard = new RegExp('(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}')
    const visa = new RegExp('^4[0-9]{6,}$')
    const amex = new RegExp('^[34|37][0-9]{14}$')
    const discover = new RegExp('^6011-?\d{4}-?\d{4}-?\d{4}$')

    return (
      visa.test(card*1) ? 'Visa' : 
      masterCard.test(card*1) ? 'Master Card' : 
      amex.test(card*1) ? 'American Express' : 
      discover.test(card*1) ? 'Discover' : 
      'Not a valid card'
    )
  
  }

  return (
    <div className='container mt-3'>
      <h1 className='mb-2'> Credit Cards </h1>
      <button className='btn btn-dark mb-4'> Add Card </button>
      <div className='card-list'>
        {
          creditCards.map(creditCard => {
            return (
              <div className='card-item' key={creditCard.id}>
                <h3>{creditCard.firstname} {creditCard.lastname}</h3>
                <h4>{cardType(creditCard.number)}: XXXX XXXX XXXX {creditCard.number.slice(-4)}</h4> 
                <h4>EXP: {creditCard.exp}</h4>
                <button className='btn btn-sm btn-secondary mr-1'> Edit Card </button>
                <button className='btn btn-sm btn-danger'> Remove Card </button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const mapState = ({ auth, creditCards }) => {
  return {
    creditCards,
    user: auth.user
  }
}

export default connect(mapState)(CreditCards)