const express = require('express');
const app = express();

const volleyball = require('volleyball');
const path = require('path');
const db = require('./db');

app.use(volleyball);
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

<<<<<<< HEAD
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
//app.use('/api', require('./routes'));
=======
db.sync()
  .then(() => db.seed())
  .then(() => console.log('!!**Database seeded**!!'));

app.use('/api', require('./routes'));

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use('/public', express.static('public'));
app.use('/vendor', express.static('node_modules'));
app.use('/dist', express.static('dist'));

app.use('/api', require('./routes'));
>>>>>>> 42e16cbe0e5afa4f9df675f7a696fb257b781f1c
app.use('/auth', require('./auth'));

app.get('/', (req,res,next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err,req,res,next) => {
  console.log(`*** There is an error! ${err.stack} ***`)
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

db.sync()
  .then(() => db.seed());
