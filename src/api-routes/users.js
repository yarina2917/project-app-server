const express = require('express')
const csv = require('csv-parser')

const userService = require('../services/users/users')
const userDataService = require('../services/users/users-data')
const validator = require('../validators/user/validator-user')
const { validate } = require('../services/error-handling/validate-middleware')
const authentication = require('../services/passport/passport-middleware')

const { HttpError } = require('../services/error-handling/http.errors')

const router = express.Router()

router.get('/get', authentication.apiKey, (req, res, next) => {
  userService.getUsers()
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.get('/get-one/:id', authentication.apiKey, (req, res, next) => {
  userService.getUser(req.params.id)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.get('/get-one', (req, res, next) => {
  userService.getUserByToken(req.headers)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.post('/create', validate(validator.createUser), (req, res, next) => {
  userService.createUser(req.body)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.post('/login', authentication.local, (req, res, next) => {
  userService.loginUser(req.body)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.get('/logout', authentication.apiKey, (req, res, next) => {
  userService.logoutUser(req.headers)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.put('/update/:id', authentication.apiKey, validate(validator.updateUser), (req, res, next) => {
  userService.updateUser(req.params.id, req.body)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.delete('/delete/:id', authentication.apiKey, (req, res, next) => {
  userService.deleteUser(req.params.id)
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.get('/export', authentication.apiKey, (req, res, next) => {
  userDataService.exportToCsv()
    .then(data => res.status(200).send(data))
    .catch(next)
})

router.post('/import', authentication.apiKey, (req, res, next) => {
  const result = []
  req
    .pipe(csv())
    .on('data', chunk => result.push(chunk))
    .on('error', () => next(new HttpError('Error uploading file', 500)))
    .on('end', () => {
      userDataService.importFromCsv(result)
        .then(data => res.status(200).send(data))
        .catch(next)
    })
})

router.get('/logger', authentication.apiKey, (req, res, next) => {
  userDataService.getLogger()
    .then(data => res.status(200).send(data))
    .catch(next)
})

module.exports = router
