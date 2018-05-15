const router = require('express').Router();
const { SearchResult } = require('../db').models;

router.get('/', (req, res, next) => {
  SearchResult.findAll()
    .then(searchResults => {
      res.send(searchResults);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  SearchResult.create(req.body)
    .then(searchResult => res.send(searchResult))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  SearchResult.findById(req.params.id)
    .then(searchResult => searchResult.destroy())
    .then(res.sendStatus(204))
    .catch(next);
});

module.exports = router;
