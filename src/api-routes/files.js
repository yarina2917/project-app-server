const express = require('express')

const fileService = require('../services/files/files')
const authentication = require('../services/passport/passport-middleware')

const { HttpError } = require('../services/error-handling/http.errors')

const router = express.Router()

router.get('/get', authentication.apiKey, (req, res, next) => {
  fileService.getFiles(req.query.type, req.user)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.get('/get/:id', authentication.apiKey, (req, res, next) => {
  fileService.getFile(req.params.id)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.post('/change-access', authentication.apiKey, (req, res, next) => {
  fileService.changeAccess(req.body)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.post('/upload', authentication.apiKey, (req, res, next) => {
  const chunks = []
  req
    .on('data', chunk => chunks.push(chunk))
    .on('error', () => next(new HttpError('Error uploading file', 500)))
    .on('end', () => {
      fileService.saveFile(Buffer.concat(chunks), req.query, req.user._id)
        .then(data => res.status(200).send(data))
        .catch(next)
    })
})

router.delete('/delete/:id', authentication.apiKey, (req, res, next) => {
  fileService.deleteFile(req.params.id, req.query.path)
    .then(data => res.status(200).send(data))
    .catch(next)
})

module.exports = router
