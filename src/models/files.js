const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: String,
    required: true
  },
  users: {
    type: [String],
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'audio', 'video'],
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}
)

const File = mongoose.model('File', fileSchema)

module.exports.File = File
