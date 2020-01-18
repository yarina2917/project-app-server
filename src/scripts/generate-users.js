const path = require('path')

const createCsvWriter = require('csv-writer').createObjectCsvWriter
const { encrypt } = require('../services/utils/utils')
const { adminRole, userRole, userFileHeaders } = require('../models/user')

function generateUsers () {
  const users = []
  for (let i = 0; i < 101; i++) {
    users.push({
      firstName: `test ${i}`,
      lastName: `test ${i}`,
      email: `test${i}@test`,
      password: encrypt(`testpassword${i}`),
      role: Math.random() < 0.5 ? adminRole : userRole
    })
  }
  const csvWriter = createCsvWriter({
    path: path.join(__dirname, '../files/users.csv'),
    header: userFileHeaders,
    append: true
  })
  csvWriter.writeRecords(users)
    .then(() => console.log('Success writing'))
    .catch((err) => console.log('Error', err))
}

generateUsers()
