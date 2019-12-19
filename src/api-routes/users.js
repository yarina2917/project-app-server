const express = require('express')
const router = express.Router()

const {
    getUsers,
    getUser,
    createUser,
    loginUser,
    logoutUser,
    updateUser,
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

router.post('/create', (req, res, next) => {
    createUser(req.body)
        .then(data => res.status(200).send(data))
        .catch(next)
})

router.post('/login', (req, res, next) => {
    loginUser(req.body, req.headers)
        .then(data => res.status(200).send(data))
        .catch(next)
})

router.get('/logout/:id', (req, res, next) => {
    console.log('!!!', req.params.id)
    logoutUser(req.params.id)
      .then(data => res.status(200).send(data))
      .catch(next)
})

router.put('/update/:id', validate(validateUser), (req, res, next) => {
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
