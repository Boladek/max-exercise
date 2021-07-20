const pool = require('./db');

pool.on('connect', () => {
  console.log('connected to the db');
});