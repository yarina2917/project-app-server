const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  title: {
    type: String
  },
  path: {
    type: String
  },
  type: {
    type: String,
    enum: ['image', 'video', 'file']
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
