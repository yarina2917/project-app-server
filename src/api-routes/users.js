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
    updateUserPassword,
    deleteUser
} = require('../services/users')
const { validateUser } = require('../validators/user')
const { validate } = require('../services/error-handling/validate-middleware')

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

router.post('/create', validate(validateUser), (req, res, next) => {
    createUser(req.body)
        .then(data => res.status(200).send(data))
        .catch(next)
})

router.get('/login', (req, res, next) => {
    loginUser(req.headers)
        .then(data => res.status(200).send(data))
        .catch(next)
})

router.get('/logout', (req, res, next) => {
    logoutUser(req.headers)
      .then(data => res.status(200).send(data))
      .catch(next)
})

router.put('/update/:id', validate(validateUser), (req, res, next) => {
    updateUser(req.params.id, req.body)
        .then(data => res.status(200).send(data))
        .catch(next)
})

router.put('/update-password/:id', (req, res, next) => {
    updateUserPassword(req.params.id, req.body)
      .then(data => res.status(200).send(data))
      .catch(next)
})

router.delete('/delete/:id', (req, res, next) => {
    deleteUser(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(next)
})

module.exports = router
