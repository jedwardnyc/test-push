const db = require('./db');
const conn = require('./db/conn');

console.log('Syncing database');
db.sync()
  .then(() => {
    console.log('Seeding database');
    db.seed()
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
