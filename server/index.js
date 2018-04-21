const express = require('express');
const path = require('path')
const app = express();
const db = require('./db');

app.use(require('body-parser').json());

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
app.use('/auth', require('./auth'));

app.get('/', (req,res,next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err,req,res,next) => {
  console.log(`*** There is an error! ${err.stack} ***`)
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

