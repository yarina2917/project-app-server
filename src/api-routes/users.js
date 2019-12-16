const express = require('express')
const router = express.Router()
const { getUsers, getUser, createUser, loginUser, updateUser, deleteUser } = require('../services/users')

router.get('/get', (req, res, next) => {
    getUsers()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send('Get users error'))
})

router.get('/get-one/:id', (req, res, next) => {
    getUser(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send('Get user error'))
})

router.post('/create', (req, res, next) => {
    createUser(req.body)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
})

router.post('/login', (req, res, next) => {
    loginUser(req.body)
        .then(data => {
            console.log(data)
            res.status(200).send(data)
        })
        .catch(err => res.status(500).send(err))
})

router.put('/update/:id', (req, res, next) => {
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
