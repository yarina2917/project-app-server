const express = require('express')
const router = express.Router()

const fileService = require('../services/files/files')
const authentication = require('../services/passport/passport-middleware')

router.get('/get', authentication.apiKey, (req, res, next) => {
  fileService.getFiles(req.query.type)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.get('/get-one/:id', authentication.apiKey, (req, res, next) => {

})

router.post('/upload', authentication.apiKey, (req, res, next) => {
  const chunks = [];
  req.on('data', chunk => {
      chunks.push(chunk)
    })
    .on('error', () => {
      next()
    })
    .on('end', () => {
      fileService.saveFile(Buffer.concat(chunks), req.query)
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
