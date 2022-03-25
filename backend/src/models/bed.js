const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BedSchema = new Schema({
  type: {
    type: String,
    enum: ['single', 'double'],
    required: 'Kindly enter the type for bed'
  }
})

const Bed = mongoose.model('Bed', BedSchema)

module.exports = {
  Bed,
  BedSchema
}
