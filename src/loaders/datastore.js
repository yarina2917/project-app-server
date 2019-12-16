const mongoose = require('mongoose');
const config = require('../config/config')

mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Сonnection error:'));
db.once('open', () => console.log('Database is working'));

module.exports.db = db;
