const fs = require('fs')
const path = require('path')
const pick = require('lodash/pick')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const User = require('../../models/user').User
const { createError } = require('../error-handling/http.errors')

const { userFileHeaders } = require('../../models/user')
const filePath = {
  users: path.join(__dirname, '../../files/users.csv'),
  logger: path.join(__dirname, '../../files/users-logger.txt')
}

function exportToCsv () {
  return new Promise((resolve, reject) => {
    const fields = ['firstName', 'lastName', 'email', 'password', 'role']
    User
      .find()
      .then(data => {
        const csvWriter = createCsvWriter({
          path: filePath.users,
          header: userFileHeaders
        })
        csvWriter.writeRecords(data.map(user => pick(user, fields)))
          .then(() => resolve({ message: 'Success' }))
      })
      .catch(error => reject(createError(error)))
  })
}

function importFromCsv (users) {
  return new Promise((resolve, reject) => {
    const promises = []
    const loggerData = {
      date: new Date(),
      countAll: users.length,
      countSuccess: 0,
      errors: []
    }

    users.forEach(userData => {
      promises.push(
        new Promise((resolve, reject) => {
          User
            .findOneAndUpdate({ email: userData.email }, userData, {
              upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true
            })
            .then(data => {
              loggerData.countSuccess++
              resolve(data)
            })
            .catch(error => {
              loggerData.errors.push(error.message)
              reject(createError(error))
            })
        })
      )
    })

    Promise.all(promises)
      .then((data) => {
        writeUserLogger(loggerData)
        resolve(data)
      })
      .catch((err) => {
        writeUserLogger(loggerData)
        reject(err)
      })
  })
}

function writeUserLogger (data) {
  fs.readFile(filePath.logger, (err, res) => {
    const fileData = (err || !res.length) ? [] : JSON.parse(res)
    fileData.push(data)
    fs.writeFile(filePath.logger, JSON.stringify(fileData, null, '\t'), () => {})
  })
}

function getLogger () {
  return new Promise((resolve) => {
    fs.readFile(filePath.logger, (err, res) => {
      err ? resolve([]) : resolve(res)
    })
  })
}

module.exports.exportToCsv = exportToCsv
module.exports.importFromCsv = importFromCsv
module.exports.getLogger = getLogger
