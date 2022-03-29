const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const { BookingSchema } = require('./booking')
const { ReservationSchema } = require('./reservation')

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
    required: 'Kindly enter the user passowrd'
  },
  role: {
    type: String,
    enum: ['ADMIN', 'CLERK', 'CUSTOMER'],
    default: 'CUSTOMER',
    required: 'Kindly enter the user role'
  },
  validated: {
    type: Boolean,
    default: false
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
    user.password = await bcrypt.hash(user.password, salt)
    callback()
  } catch (err) {
    return callback(err)
  }
})

UserSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = { User }
