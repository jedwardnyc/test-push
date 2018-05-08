import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CreditCards = (props) => {

  const { creditCards, user } = props;

  const cardType = (card) => {

    const masterCard = new RegExp('(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}')
    const visa = new RegExp('^4[0-9]{6,}$')
    const amex = new RegExp('^[34|37][0-9]{14}$')
    const discover = new RegExp('^6011-?\d{4}-?\d{4}-?\d{4}$')

    return (
      visa.test(card*1) ? 'VISA' :
      masterCard.test(card*1) ? 'MC' :
      amex.test(card*1) ? 'AMEX' :
      discover.test(card*1) ? 'DISCOVER' :
      'Not a valid card'
    )

  }
  if (!user) return null;
  return (
    <div className='container mt-3'>
      <div className='cc-header'>
        <div className='mb-2 cc-title'> {user.firstname}'s Credit Cards </div>
        <button className='btn btn-dark cc-add'> Add Card </button>
      </div>
      <div className='cc-list'>
        {
          creditCards.map(creditCard => {
            return (
              <div className='cc-item' key={creditCard.id}>
                <div className='cc-info'>
                  <h2>{creditCard.firstname} {creditCard.lastname}</h2>
                  <h4>{cardType(creditCard.number)}: XXXX XXXX XXXX {creditCard.number.slice(-4)}</h4>
                  <h4>EXP: {creditCard.exp}</h4>
                </div>
                <div className='cc-buttons'>
                  <button className='btn btn-sm btn-secondary mr-1'> Edit Card </button>
                  <button className='btn btn-sm btn-danger'> Remove Card </button>
                </div>
              </div>
            )
          })
        }
      </div>
      <Link to='/account'><button className='mt-4 btn btn-sm btn-dark'> Back to Account </button></Link>
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
