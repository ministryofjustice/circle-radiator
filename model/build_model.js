const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BuildSchema = new Schema({
  build: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  data: {
    type: JSON,
    required: true
  }
})

module.exports = mongoose.model('build', BuildSchema)
