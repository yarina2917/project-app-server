const express = require('express')
const router = express.Router()

const {
    getUsers,
    getUser,
    createUser,
    loginUser,
    updateUser,
    deleteUser
} = require('../services/users')
const { validateUser } = require('../validators/user')
const { validate } = require('../services/error-handling/validate-middleware')

router.get('/get', (req, res, next) => {
    getUsers()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
})

router.get('/get-one/:id', (req, res, next) => {
    getUser(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
})

router.post('/create', validate(validateUser), (req, res, next) => {
    createUser(req.body)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
})

router.post('/login', (req, res, next) => {
    loginUser(req.body)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
})

router.put('/update/:id', validate(validateUser), (req, res, next) => {
    updateUser(req.params.id, req.body)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
})

router.delete('/delete/:id', (req, res, next) => {
    deleteUser(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
})

module.exports = router
