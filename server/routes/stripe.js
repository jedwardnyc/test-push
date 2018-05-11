const stripe = require("stripe")("sk_test_qg6RPYQiaTyOWrjxTep6uqjD");
const router = require('express').Router();

router.post('/checkout', (req,res) => {
  console.log(req.body)
  stripe.charges.create({
    amount: req.body.amount,
    currency: req.body.currency,
    source: req.body.source,
    receipt_email: req.body.email,
  })
  .then(() => res.sendStatus(200))
})

module.exports = router;