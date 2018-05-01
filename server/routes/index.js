const router = require('express').Router()

//routes to individual apis
router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/lineitems', require('./lineitems'));
router.use('/orders', require('./orders'));
router.use('/cart', require('./cart'));

module.exports = router;
