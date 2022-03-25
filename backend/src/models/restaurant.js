const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { DishSchema } = require('./dish')

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name for restaurant'
  },
  capacity: {
    type: Number,
    min: 0,
    required: 'Kindly enter the capacity for restaurant'
  },
  menu: [DishSchema]
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = {
  Restaurant
}
