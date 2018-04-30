const router = require('express').Router();
const User = require('../db/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cyrpto = require('crypto');
const { secret } = require('./config');

router.post('/register', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create(Object.assign({}, req.body, { password: hashedPassword }))
  .then(user => {
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });
    res.send({ token });
  })
  .catch(err => res.status(500).send('There was a problem adding the information to the database.', err));
});

router.post('/me', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, secret, (err, decoded) => {
    User.findById(decoded.id, { attributes: { exclude: ['password'] } })
    .then(user => res.send(user))
    .catch(err => res.status(404).send({ message: 'Whoops! Looks like we can\'t find you!' }))
  });
});

router.post('/login', (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ token: null });
      const token = jwt.sign({ id: user.id }, secret, {expiresIn: 86400 });
      res.status(200).send({ token });
    })
    .catch(err => res.status(404).send({ message: err }));
});

router.post('/forgot', (req, res) => {
  User.findOne({ where: { email: req.body.email },  attributes: { exclude: ['password'] }  })
  .then(user => {
    cyrpto.randomBytes(8, (err, buf) => {
      let token = buf.toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpire = Date.now() + 3600000; // 1 hour from now
      res.send(user)
    })
  })

  .catch(err => console.log(err))
})

router.post('/reset/:token', (req, res) => {
  
})

module.exports = router;
