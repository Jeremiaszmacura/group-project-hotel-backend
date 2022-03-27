const { User } = require('../models/user')
const mongoose = require('mongoose')
require('dotenv').config()

// create array of seed data
const users = [
  new User({
    name: 'Adam',
    surname: 'Kowalsky',
    address: 'main street',
    email: 'adam@email.com',
    password: '12345678',
    role: 'ADMIN'
  })]

// connect mongoose
require('../config/mongooseLocalDB')

// seed data and disconnect
users.map(async (user, index) => {
  await user.save(() => {
    if (index === users.length - 1) {
      console.log('DONE!')
      mongoose.disconnect()
    }
  })
})
