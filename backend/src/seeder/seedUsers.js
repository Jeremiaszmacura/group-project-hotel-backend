const { User } = require('../models/user')
const mongoose = require('mongoose')

// connect mongoose
require('../config/mongooseLocalDB')

const users = [
  {
    name: 'Adam',
    surname: 'Kowalsky',
    phoneNumber: '123123123',
    address: 'main street',
    email: 'adam@email.com',
    password: '12345678',
    role: 'ADMIN',
    validated: true
  },
  {
    name: 'Jan',
    surname: 'Kowalsky',
    phoneNumber: '123123123',
    address: 'main street',
    email: 'jan@email.com',
    password: '12345678',
    role: 'CLERK',
    validated: true
  }
]
// seed database
const seedDB = async () => {
  await User.deleteMany({})
  const insUsers = await User.insertMany(users)
  console.log(insUsers)
}

seedDB().then(() => {
  mongoose.connection.close()
})

module.exports = {
  seedDB
}
