const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomsCalendarSchema = new Schema({
  date: {
    type: Date,
    required: 'Kindly enter the date for calendar'
  },
  rooms: [{
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: 'Kindly enter the room for calendar'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  }]
})

const RoomsCalendar = mongoose.model('RoomsCalendar', RoomsCalendarSchema)

module.exports = {
  RoomsCalendar
}
