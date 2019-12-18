const config = {
    PORT: '3000',
    DB_URL: 'mongodb://localhost/test',
    DB_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}

module.exports = config
