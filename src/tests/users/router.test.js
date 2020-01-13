const chai = require('chai')
const chaiHttp = require('chai-http')

const { User } = require('../../models/user')
const mockUsers = require('../fixtures/users')

const server = require('../../app')
const should = chai.should()

chai.use(chaiHttp)

describe('Users', () => {

  beforeEach((done) => {

  })

  it('it should return 401', done => {
    chai.request(server)
      .get('/users/get')
      .end((err, res) => {
        if (err && err.status !== 401) {
          throw err
        }
        res.should.have.status(401)
        done()
      })
  })

  it('it should GET all the users', done => {
    chai.request(server)
      .get('/users/get')
      .set('x-api-key', 'dd2e6510-541a-44cf-9ddd-46a71d65e389')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(2)
        done()
      })
  })

  it('it should create new user', done => {
    const userData = {
      firstName: 'test',
      lastName: 'test',
      email: 'test2@test.com',
      password: 'U2FsdGVkX1+S1JmUsID3ROYIa27Mwwqd09vK0iiyk4g=',
    }

    chai.request(server)
      .post('/users/create')
      .send(userData)
      .end((err, res) => {
        if (err) {
          throw err
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.firstName.should.be.eq('test')
        res.body.lastName.should.be.eq('test')
        res.body.email.should.be.eq('test2@test.com')
        res.body.role.should.be.eq('USER')
        res.body._id.should.be.a('string')
        done()
      })
  })

  it('it should return 400 while creating new user', done => {
    const userData = {
      firstName: 'test',
      lastName: 'test',
      email: 'test2@test.com',
      password: 'U2FsdGVkX1+S1JmUsID3ROYIa27Mwwqd09vK0iiyk4g=',
    }

    chai.request(server)
      .post('/users/create')
      .send(userData)
      .end((err, res) => {
        if (err && err.status !== 400) {
          throw err
        }
        res.should.have.status(400)
        res.body.message.should.include('Email is already used')
        done()
      })
  })

  after(() => {

  })


})
