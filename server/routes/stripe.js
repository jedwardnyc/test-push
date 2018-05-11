const { secretStripe } = require('../auth/config');
const stripe = require("stripe")(secretStripe || process.env.SECRET_STRIPE);
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