const User = require('../models/user').User
const mongoose = require('mongoose');
const config = require('../config/config')

const fields = [{
    name: 'First name: ',
    prop: 'firstName',
},{
    name: 'Last name: ',
    prop: 'lastName',
}, {
    name: 'Email: ',
    prop: 'email',
}, {
    name: 'Password: ',
    prop: 'password',
}, {
    name: 'Role: ',
    prop: 'role',
}]

const userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
}

mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection
db.once('open', () => {
    let activeField = 0
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    process.stdout.write(fields[activeField].name)

    process.stdin.on('data', (chunk) => {
        userData[fields[activeField].prop] = chunk
        if (activeField + 1 < fields.length) {
            activeField++
            process.stdout.write(fields[activeField].name)
        } else {
            const user = new User(userData)
            user.save()
                .then((res) => {
                    console.log('Success', res)
                    process.exit()
                })
                .catch(err => {
                    console.log('Error', err)
                    process.exit()
                })
        }
    });
});

db.on('error', console.error.bind(console, 'Сonnection error:'));



