const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const BookingSchema = new Schema({
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

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the user name',
    trim: true
  },
  surname: {
    type: String,
    required: 'Kindly enter the user surname',
    trim: true
  },
  phoneNumber: {
    type: String,
    required: 'Kindly enter the user phone number',
    trim: true
  },
  address: {
    type: String,
    required: 'Kindly enter the user address'
  },
  email: {
    type: String,
    required: 'Kindly enter the user email',
    lowercase: true,
    unique: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: 'Kindly enter the user passowrd',
    minlength: 8,
    match: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Please fill a valid user password. Valid password should containt at least: one number, one special character']
  },
  role: {
    type: String,
    enum: ['ADMIN', 'CLERK', 'CUSTOMER'],
    default: 'CUSTOMER',
    required: 'Kindly enter the user role'
  },
  bookings: [BookingSchema],
  reservations: [ReservationSchema]
}, { timestamps: true })

UserSchema.pre('save', async function (callback) {
  const user = this
  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback()

  try {
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    callback()
  } catch (err) {
    return callback(err)
  }
})

UserSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const Booking = mongoose.model('Booking', BookingSchema)
const Reservation = mongoose.model('Reservation', ReservationSchema)
const User = mongoose.model('User', UserSchema)

module.exports = {
  Booking,
  Reservation,
  User
}
