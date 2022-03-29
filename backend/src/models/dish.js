const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DishSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name for dish'
  },
  price: {
    type: Number,
    min: 0,
    required: 'Kindly enter the price for dish'
  },
  description: {
    type: String,
    required: 'Kindly enter the description for dish'
  },
  availability: {
    type: Boolean,
    default: true
  }
})

module.exports = {
  DishSchema
}
