const chai = require('chai')
const chaiHttp = require('chai-http')

const { User } = require('../../models/user')
const mockUsers = require('../fixtures/users')

const server = require('../../app')
const should = chai.should()

chai.use(chaiHttp)

describe('Users', () => {
  let apiKey = ''
  let id = ''

  before(async () => {
    const user = new User(mockUsers.users[0])
    await user
      .save()
      .then(data => {
        apiKey = data.apiKey
        id = data._id
        console.log('save')
      })
      .catch(() => console.log('error save'))
  })

  it('it should create new user', done => {
    chai.request(server)
      .post('/users/create')
      .send(mockUsers.users[1])
      .end((err, res) => {
        if (err) {
          throw err
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.role.should.be.eq('USER')
        res.body._id.should.be.a('string')
        done()
      })
  })

  it('it should return 400 while creating new user', done => {
    chai.request(server)
      .post('/users/create')
      .send(mockUsers.users[1])
      .end((err, res) => {
        res.should.have.status(400)
        res.body.message.should.include('Email is already used')
        done()
      })
  })

  it('it should return 401 if no x-api-key given', done => {
    chai.request(server)
      .get('/users/get')
      .end((err, res) => {
        res.should.have.status(401)
        done()
      })
  })

  it('it should GET one user', done => {
    chai.request(server)
      .get(`/users/get-one/${id}`)
      .set('x-api-key', apiKey)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.firstName.should.be.eq(mockUsers.users[0].firstName)
        res.body.lastName.should.be.eq(mockUsers.users[0].lastName)
        res.body.email.should.be.eq(mockUsers.users[0].email)
        res.body.role.should.be.eq(mockUsers.users[0].role)
        done()
      })
  })

  it('it should GET all the users', done => {
    chai.request(server)
      .get('/users/get')
      .set('x-api-key', apiKey)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.greaterThan(2)
        done()
      })
  })

  it('it should return 200 while editing user information', done => {
    const params = {
      firstName: 'test2',
      lastName: 'test2'
    }
    chai.request(server)
      .put(`/users/update/${id}`)
      .send(params)
      .set('x-api-key', apiKey)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.firstName.should.be.eq(params.firstName)
        res.body.lastName.should.be.eq(params.lastName)
        res.body.email.should.be.eq(mockUsers.users[0].email)
        res.body.role.should.be.eq(mockUsers.users[0].role)
        done()
      })
  })

  it('it should return 200 while deleting user', done => {
    chai.request(server)
      .delete(`/users/delete/${id}`)
      .set('x-api-key', apiKey)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.message.should.include('Success')
        done()
      })
  })

  after(() => {
    mockUsers.users.forEach(async user => {
      await User
        .findOneAndRemove({ email: user.email })
        .then(() => console.log('remove'))
        .catch(() => console.log('error remove'))
    })
  })
})
