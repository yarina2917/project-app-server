const config = {
    port: process.env.PORT,
    dbUrl: 'mongodb://localhost/test',
    dbOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    adminFilePath: '/admin/dist/admin/index.html',
    secretKey: 'YCekqwJ9r9C1uh8XaWoZCvHbpzbKQTRg'
}

module.exports = config
