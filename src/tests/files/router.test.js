const chai = require('chai')
const chaiHttp = require('chai-http')

const mockUsers = require('../fixtures/users')
const { User } = require('../../models/user')

const server = require('../../app')

chai.should()
chai.use(chaiHttp)

describe('Files', () => {
  let userConfig = {}
  let fileConfig = {}

  before(async () => {
    const user = new User(mockUsers.users[0])
    await user
      .save()
      .then(data => {
        userConfig = {
          apiKey: data.apiKey,
          id: data._id.toString()
        }
        console.log('save')
      })
      .catch(() => console.log('error save'))
  })

  it('it should create new file', done => {
    chai.request(server)
      .post('/files/upload?type=image&title=test&extname=jpg')
      .attach('files', './src/tests/fixtures/img.jpg', 'img.jpg')
      .set('x-api-key', userConfig.apiKey)
      .end((err, res) => {
        if (err) {
          throw err
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body._id.should.be.a('string')
        res.body.path.should.be.a('string')
        res.body.path.should.include('jpg')
        res.body.type.should.be.eq('image')
        res.body.title.should.be.eq('test')
        res.body.owner.should.be.eq(userConfig.id)
        fileConfig = {
          id: res.body._id,
          path: res.body.path
        }
        done()
      })
  })

  it('it should GET all files by type', done => {
    chai.request(server)
      .get('/files/get?type=image')
      .set('x-api-key', userConfig.apiKey)
      .end((err, res) => {
        if (err) {
          throw err
        }
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.greaterThan(1)
        res.body.forEach(el => el.type.should.be.eq('image'))
        done()
      })
  })

  it('it should return 200 while deleting file', done => {
    chai.request(server)
      .delete(`/files/delete/${fileConfig.id}?path=${fileConfig.path}`)
      .set('x-api-key', userConfig.apiKey)
      .end((err, res) => {
        console.log('err', err)
        if (err) {
          throw err
        }
        res.should.have.status(200)
        res.body.message.should.include('Success')
        done()
      })
  })

  after(() => {
    User
      .findOneAndRemove({ email: mockUsers.users[0].email })
      .then(() => console.log('remove'))
      .catch(() => console.log('error remove'))
  })
})
