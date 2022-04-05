const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { BedSchema } = require('./bed')

const RoomSchema = new Schema({
  number: {
    type: Number,
    required: 'Kindly enter the number for room',
    unique: true,
    parse: true
  },
  price: {
    type: Number,
    min: 0,
    required: 'Kindly enter the price for room'
  },
  pictures: {
    type: [String]
  },
  additionalFeatures: {
    type: [String]
  },
  beds: {
    type: [BedSchema],
    required: 'Kindly enter the bed for room'
  }
})

RoomSchema.index({ price: 1, additionalFeatures: 1 }) // ascending

module.exports = {
  RoomSchema
}
