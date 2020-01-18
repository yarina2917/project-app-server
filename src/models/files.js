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
  users: {
    type: [String],
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'audio', 'file'],
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
