const mongoose = require('mongoose');
const config = require('../config/config')

mongoose.connect(config.DB_URL, config.DB_OPTIONS);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Сonnection error:'));
db.once('open', () => console.log('Mongo is connecting'));

module.exports.db = db;
