const express = require('express');
const app = express();

const volleyball = require('volleyball');
const path = require('path');
const db = require('./db');

app.use(volleyball);
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/lineitems', require('./routes/lineitems'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/uploads', require('./routes/uploads'));

//app.use('/api', require('./routes'));
app.use('/auth', require('./auth'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.log(`*** There is an error! ${err.stack} ***`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

 db.sync()
  .then(() => db.seed());
