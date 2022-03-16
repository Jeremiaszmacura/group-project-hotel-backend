const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingSchema = new Schema({
  startsAt: {
    type: Date,
    required: true
  },
  endsAt: {
    type: Date,
    required: true
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
    required: true
  },
  names: [{
    type: String
  }],
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }]
}, { timestamps: true })

const ReservationSchema = new Schema({
  startsAt: {
    type: Date,
    required: true
  },
  numberOfPeople: {
    type: Number,
    default: 1,
    required: true
  },
  tables: [{
    type: Schema.Types.ObjectId,
    ref: 'Table'
  }]
}, { timestamps: true })

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'CLERK', 'CUSTOMER'],
    default: 'CUSTOMER',
    required: true
  },
  bookings: [BookingSchema],
  reservations: [ReservationSchema]
}, { timestamps: true })

const Booking = mongoose.model('Booking', BookingSchema)
const Reservation = mongoose.model('Reservation', ReservationSchema)
const User = mongoose.model('User', UserSchema)

module.exports = {
  Booking,
  Reservation,
  User
}
