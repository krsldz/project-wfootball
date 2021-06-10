const mongoose = require('mongoose');
const { dbConnectionURL, options } = require('./config');

function connect() {
  mongoose.connect(dbConnectionURL, options).then(() => console.log('Connected to DB')).catch(() => console.log('Error with DB'));
}

module.exports = connect;
