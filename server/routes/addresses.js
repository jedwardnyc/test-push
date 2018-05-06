const router = require('express').Router();
const { Address } = require('../db').models;

router.post('/get', (req, res, next) => {
  Address.findAll({ where: { user_id: req.body.id } })
  .then(addresses => res.send(addresses))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Address.create(req.body)
  .then(address => res.send(address))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  Address.findById(req.params.id)
  .then(address => {
    console.log(req.body)
    address.update(req.body);
    res.send(address);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Address.findById(req.params.id)
  .then(address => {
    address.destroy();
    res.sendStatus(204);
  })
  .catch(next);
});

module.exports = router;