const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const customAlphabet = require('nanoid').customAlphabet
const idGenerator = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6)

const BookingSchema = new Schema({
  confirmationNumber: {
    type: String,
    unique: true,
    sparse: true,
    // This validation does not run after middleware pre-save
    validate: {
      validator: function (v) {
        return /\d{6}-\w{6}/.test(v)
      },
      message: 'confirmation number is not valid!, Pattern("d(6)-w(6)")'
    }
  },
  startsAt: {
    type: Date,
    required: 'Kindly enter the start date for booking'
  },
  endsAt: {
    type: Date,
    required: 'Kindly enter the end date for booking'
  },
  price: {
    type: Number,
    default: 0
  },
  comment: {
    type: String
  },
  numberOfPeople: {
    type: Number,
    default: 1,
    required: 'Kindly enter the number of people for booking'
  },
  guestNames: [{
    type: String
  }],
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }]
}, { timestamps: true })

BookingSchema.pre('save', function (callback) {
  const booking = this
  let day = moment().format('L')
  day = day.replaceAll('/', '')
  day = day.slice(0, 4) + day.slice(6)

  booking.confirmationNumber = [day, idGenerator()].join('-')

  callback()
})

BookingSchema.index({ startsAt: -1, endsAt: -1 }) // descending

module.exports = {
  BookingSchema
}
