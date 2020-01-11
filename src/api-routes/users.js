const express = require('express')
const router = express.Router()

const userService = require('../services/users/users')
const validator = require('../validators/validator')
const { validate } = require('../services/error-handling/validate-middleware')
const authentication = require('../services/passport/passport-middleware')

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

module.exports = router
