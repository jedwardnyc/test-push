const express = require('express');
const app = express();
const db = require('./db');

app.use(require('body-parser').json());

db.sync()
  .then(() => db.seed());

app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
