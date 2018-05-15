const config = require('../auth/config');
const stripe = require("stripe")(process.env.SECRET_STRIPE || config.secretStripe)
const router = require('express').Router();

router.post('/checkout', (req,res) => {
  stripe.charges.create({
    amount: req.body.amount,
    currency: req.body.currency,
    source: req.body.source,
    receipt_email: req.body.email,
  })
  .then(() => res.sendStatus(200))
})

module.exports = router;