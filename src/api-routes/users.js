const express = require('express')
const router = express.Router()

const {
    getUsers,
    getUser,
    getUserByToken,
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
} = require('../services/users')
const validator = require('../validators/validator')
const { validate } = require('../services/error-handling/validate-middleware')
const authentication = require('../services/passport/passport-middleware')

router.get('/get', (req, res, next) => {
    getUsers()
        .then(data => res.status(200).send(data))
        .catch(next)
})

router.get('/get-one/:id', (req, res, next) => {
    getUser(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(next)
})

router.get('/get-one', (req, res, next) => {
    getUserByToken(req.headers)
      .then(data => res.status(200).send(data))
      .catch(next)
})

router.post('/create', validate(validator.createUser), (req, res, next) => {
    createUser(req.body)
        .then(data => res.status(200).send(data))
        .catch(next)
})

router.post('/login', authentication, (req, res, next) => {
    loginUser(req.body)
        .then(data => {
            res.status(200).send(data)
        })
        .catch((err) => console.log('error', err))
})

router.get('/logout', (req, res, next) => {
    logoutUser(req.headers)
      .then(data => res.status(200).send(data))
      .catch(next)
})

router.put('/update/:id', validate(validator.updateUser), (req, res, next) => {
    updateUser(req.params.id, req.body)
        .then(data => res.status(200).send(data))
        .catch(next)
})

router.delete('/delete/:id', (req, res, next) => {
    deleteUser(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(next)
})

module.exports = router
