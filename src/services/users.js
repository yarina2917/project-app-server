const User = require('../models/user').User

function getUsers() {
    return new Promise((resolve, reject) => {
        User
            .find()
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        User
            .findById(id)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}


function createUser(userData) {
    return new Promise((resolve, reject) => {
        User
            .findOne({email: userData.email})
            .then(data => {
                if (data) {
                    reject('Email is already used')
                } else {
                    const user = new User(userData);
                    user.save()
                        .then((data) => resolve(data))
                }
            })
            .catch(err => reject(err))
    })
}

function loginUser(userData) {
    return new Promise((resolve, reject) => {
        User
            .findOne(userData)
            .then(data => data ? resolve({token: data._id}) : reject('Wrong login data'))
            .catch(err => reject(err))
    })
}

function updateUser(id, userData) {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: id }, userData, {new: true})
            .then(data => resolve({data: data, message: 'Information was updated'}))
            .catch(err => reject(err))
    })

}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        User.findOneAndRemove({_id: id})
            .then(data => resolve({message: 'User was deleted'}))
            .catch(err => reject(err))
    })
}

module.exports.getUsers = getUsers
module.exports.getUser = getUser
module.exports.createUser = createUser
module.exports.loginUser = loginUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser

