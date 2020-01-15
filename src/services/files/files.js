const fs = require('fs')
const uuid = require('uuid')
const path = require('path')

const File = require('../../models/files').File
const { createError } = require('../error-handling/http.errors')
const filePath = path.join(__dirname, '../../files/')

function getFiles (type) {
  return new Promise((resolve, reject) => {
    File
      .find({ type: type })
      .then(data => resolve(data))
      .catch(error => reject(createError(error)))
  })
}

function saveFile (fileData, params) {
  return new Promise((resolve, reject) => {
    const path = `${uuid.v4()}.${params.extname}`
    fs.writeFile(filePath + path, fileData, (err) => {
      if (err) {
        reject(createError(err))
      }
      const file = new File({
        title: params.title,
        path: path,
        type: params.type
      })
      file
        .save()
        .then(data => resolve(data))
        .catch(error => reject(createError(error)))
    })
  })
}

function deleteFile (id, path) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath + path, (err) => {
      if (err) {
        reject(createError(err))
      }
      File
        .findOneAndRemove({ _id: id })
        .then(data => resolve({ message: 'Success' }))
        .catch(error => reject(createError(error)))
    })
  })
}

module.exports.getFiles = getFiles
module.exports.saveFile = saveFile
module.exports.deleteFile = deleteFile
