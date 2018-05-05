const router = require('express').Router()

//routes to individual apis
router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/lineitems', require('./lineitems'));
router.use('/orders', require('./orders'));
router.use('/addresses', require('./addresses'));
router.use('/creditCards', require('./creditCards'));

module.exports = router;
