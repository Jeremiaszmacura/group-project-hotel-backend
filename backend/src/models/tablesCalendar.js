const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TablesCalendarSchema = new Schema({
  date: {
    type: Date,
    required: 'Kindly enter the date for calendar'
  },
  tables: [{
    id: {
      type: Number,
      required: 'Kindly enter the id of table'
    },
    seats: {
      type: Number,
      required: 'Kindly enter the seats number of table'
    },
    availability: {
      type: Boolean,
      default: true
    }
  }]
})

const TablesCalendar = mongoose.model('TablesCalendar', TablesCalendarSchema)

module.exports = {
  TablesCalendar
}
