const router = require('express').Router();
const { LineItem } = require('../db').models;

router.get('/', (req, res, next) => {
  LineItem.findAll()
  .then(lineItems => res.send(lineItems))
  .catch(next);
});

router.post('/', (req, res, next) => {
  console.log(req.body)
  LineItem.create(req.body)
  .then(lineItem => res.send(lineItem))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
  .then(lineItem => {
    lineItem.update(req.body);
    res.send(lineItem);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
  .then(lineItem => {
    lineItem.destroy();
    res.sendStatus(204);
  })
  .catch(next);
});

module.exports = router;
