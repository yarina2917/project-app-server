const fs = require('fs')
const uuid = require('uuid')
const path = require('path')
const { Worker, isMainThread } = require('worker_threads')

const File = require('../../models/files').File
const { createError } = require('../error-handling/http.errors')
const { adminRole } = require('../../models/user')

const filePath = path.join(__dirname, '../../files/')
const workerPath = path.join(__dirname, '../../scripts/video-worker.js')

function getFiles (type, user) {
  const search = user.role === adminRole ? { type: type } : { type: type, users: user._id }
  return new Promise((resolve, reject) => {
    File
      .find(search)
      .then(data => resolve(data))
      .catch(error => reject(createError(error)))
  })
}

function getFile (id) {
  return new Promise((resolve, reject) => {
    File
      .findById(id)
      .then(data => resolve(data))
      .catch(error => reject(createError(error)))
  })
}

function saveFile (fileData, params, id) {
  return new Promise((resolve, reject) => {
    const path = `${uuid.v4()}.${params.extname}`
    fs.writeFile(filePath + path, fileData, (err) => {
      if (err) {
        reject(createError(err))
      }
      const file = new File({
        title: params.title,
        path: path,
        type: params.type,
        owner: id,
        users: [id]
      })
      if (params.type === 'video' && isMainThread) {
        const worker = new Worker(workerPath, { workerData: path })

        worker.on('message', (result) => {
          if (result.status === 'Done') {
            file.path = result.fileName
            file
              .save()
              .then(data => {
                fs.unlink(filePath + path, (err) => {
                  if (err) {
                    console.error('Error delete file', err)
                  }
                  resolve(data)
                })
              })
              .catch(error => reject(createError(error)))
          }
        })

        worker.on('error', (err) => reject(createError(err)))

        worker.on('exit', (code) => {
          if (code) {
            console.error(`Worker stopped with exit code ${code}`)
          }
        })
      } else {
        file
          .save()
          .then(data => resolve(data))
          .catch(error => reject(createError(error)))
      }
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
        .then(() => resolve({ message: 'Success' }))
        .catch(error => reject(createError(error)))
    })
  })
}

function changeAccess (data) {
  return new Promise((resolve, reject) => {
    File
      .findOneAndUpdate({ _id: data.id }, { users: data.users })
      .then(data => resolve(data))
      .catch(error => reject(createError(error)))
  })
}

module.exports = {
  getFiles,
  getFile,
  saveFile,
  deleteFile,
  changeAccess
}
