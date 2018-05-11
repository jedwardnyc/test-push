const router = require('express').Router();
const { StarRating } = require('../db').models;

router.get('/', (req, res, next) => {
  StarRating.findAll()
    .then(starRatings => res.send(starRatings))
    .catch(next);
});

// router.post('/', (req, res, next) => {
//   StarRating.addToStarRatings(req.body)
//     .then(starRatings => res.send(starRatings))
//     .catch(next);
// });

router.post('/', (req, res, next) => {
  StarRating.create(req.body)
    .then(starRating => res.send(starRating))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  StarRating.findById(req.params.id)
    .then(starRating => {
      starRating.update(req.body);
      res.send(starRating);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  StarRating.findById(req.params.id)
    .then(starRating => starRating.destroy())
    .then(res.sendStatus(204))
    .catch(next);
});

module.exports = router;
