const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReservationSchema = new Schema({
  startsAt: {
    type: Date,
    required: 'Kindly enter the start date for reservation'
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

const Reservation = mongoose.model('Reservation', ReservationSchema)

module.exports = {
  Reservation,
  ReservationSchema
}
