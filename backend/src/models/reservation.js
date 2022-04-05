const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReservationSchema = new Schema({
  startsAt: {
    type: Date,
    required: 'Kindly enter the start date for reservation'
  },
  endsAt: {
    type: Date,
    required: 'Kindly enter the end date for reservation'
  },
  numberOfPeople: {
    type: Number,
    default: 1,
    required: 'Kindly enter the number of people for reservation'
  },
  tables: [{
    type: Schema.Types.ObjectId,
    ref: 'Table'
  }]
}, { timestamps: true })

ReservationSchema.index({ startsAt: -1, endsAt: -1 }) // descending

module.exports = {
  ReservationSchema
}
