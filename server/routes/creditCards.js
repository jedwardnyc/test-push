const router = require('express').Router();
const { CreditCard } = require('../db').models;

router.post('/', (req, res, next) => {
  CreditCard.findAll({ where: { user_id: req.body.id }})
  .then(creditCards => {
    res.send(creditCards);
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  CreditCard.create(req.body)
  .then(creditCard => res.send(creditCard))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  CreditCard.findById(req.params.id)
  .then(creditCard => {
    creditCard.update(req.body);
    res.send(creditCard);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  CreditCard.findById(req.params.id)
  .then(creditCard => {
    creditCard.destroy();
    res.sendStatus(204);
  })
  .catch(next);
});

module.exports = router;