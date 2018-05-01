const router = require('express').Router();
const User = require('../db/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cyrpto = require('crypto');
const { secret } = require('./config');
const { sendReset, sendConfirmation, sendWelcome } = require('./autoEmail');

router.post('/register', (req, res) => {
  User.create(req.body)
  .then(user => {
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });
    res.send({ token });
    sendWelcome(user);
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
    .catch(err => res.status(404).send({ message: 'That user does not exist!' }));
});

router.post('/forgot', (req, res) => {
  User.findOne({ where: { email: req.body.email },  attributes: { exclude: ['password'] }  })
  .then(user => {
    cyrpto.randomBytes(8, (err, buf) => {
      let token = buf.toString('hex');
      user.update({ resetPasswordToken: token, resetPasswordExpire: Date.now() + 3600000});
      res.send(user)
      sendReset(user, token)
    })
  })
  .catch(err => res.status(404).send({ message: 'That user does not exist!' }));
});

router.post('/reset/:token', (req,res) => {
  User.findOne({ where: { resetPasswordToken: req.params.token, resetPasswordExpire: { $gt: Date.now() }} })
  .then(user => {
    user.update({
      password: req.body.password,
      resetPasswordToken: null,
      resetPasswordExpire: null
    })
    res.send(user)
    sendConfirmation(user)
  })
  .catch(err => res.status(500).send('That user token was not found', err));
})

module.exports = router;
