const router = require('express').Router();
const { Order } = require('../db').models;

router.post('/', (req, res, next) => {
  Order.findAll({ where: { user_id: req.body.id }})
  .then(orders => res.send(orders))
  .catch(next);
});

// send user to get her cart
router.post('/cart', (req, res, next) => {
  Order.getCartForUser(req.body)
  .then(order => res.send(order))
  .catch(next); // throw error
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(order => res.send(order))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
  .then(order => {
    order.update(req.body);
    res.send(order);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Order.findById(req.params.id)
  .then(order => {
    order.destroy();
    res.sendStatus(204);
  })
  .catch(next);
});

module.exports = router;
