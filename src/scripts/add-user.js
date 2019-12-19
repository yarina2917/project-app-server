const mongoose = require('mongoose')
const readline = require('readline');

const User = require('../models/user').User
const config = require('../config/config')

const fields = [{
    title: 'First name: ',
    prop: 'firstName',
},{
    title: 'Last name: ',
    prop: 'lastName',
}, {
    title: 'Email: ',
    prop: 'email',
}, {
    title: 'Password: ',
    prop: 'password',
}, {
    title: 'Role: ',
    prop: 'role',
}]

const userData = {}
let activeField = 0

mongoose.connect(config.DB_URL, config.DB_OPTIONS);

const db = mongoose.connection

db.once('open', () => {
    const rlStream = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: fields[activeField].title
    })
    rlStream.prompt()
    rlStream.on('line', (line) => {
        userData[fields[activeField].prop] = line
        if (activeField + 1 < fields.length) {
            rlStream.setPrompt(fields[++activeField].title)
            rlStream.prompt()
        } else {
            const user = new User(userData)
            user.save()
                .then((res) => {
                    console.log('Success: ', res)
                    db.close()
                    process.exit(1)
                })
                .catch(err => {
                    console.log('Error: ', err)
                    db.close()
                    process.exit(1)
                })
        }
    });
});

db.on('error', console.error.bind(console, 'Сonnection error:'))
