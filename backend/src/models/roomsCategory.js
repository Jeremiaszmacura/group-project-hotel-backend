const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { RoomSchema } = require('./room')

const RoomsCategorySchema = new Schema({
  name: {
    type: String,
    enum: ['deluxe', 'standard'],
    required: 'Kindly enter the name for restaurant'
  },
  features: {
    type: [String]
  },
  rooms: [RoomSchema]
})

const RoomsCategory = mongoose.model('RoomsCategory', RoomsCategorySchema)

module.exports = {
  RoomsCategory
}
