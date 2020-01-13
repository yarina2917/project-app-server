const inquirer = require('inquirer')
const base = require('../loaders/datastore')

const User = require('../models/user').User
const roles = require('../models/user').roles

base.connect()
  .then(db => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'First name:'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Last name:'
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email:'
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:'
      },
      {
        type: 'list',
        name: 'role',
        message: 'Role:',
        choices: roles.map(role => {
          return {
            name: role.toLowerCase(),
            value: role
          }
        }),
        default: roles[0]
      }
    ])
      .then(answers => {
        let user = new User(answers)
        return user.save()
      })
      .then(() => {
        console.log('Saved')
      })
      .catch(err => {
        console.error('Failed to create user', err)
      })
      .then(() => {
        db.disconnect()
      })

  })
  .catch(console.error)
