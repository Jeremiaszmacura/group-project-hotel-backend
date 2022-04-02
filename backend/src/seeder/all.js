const mongoose = require('mongoose')

const { User } = require('../models/user')
const { RoomsCategory } = require('../models/roomsCategory')

// connect mongoose
require('../config/mongooseLocalDB')

// seed database
const seedDB = async () => {
  // seed users
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
  await User.deleteMany({})
  const insUsers = await User.insertMany(users)
  console.log(insUsers)

  const categories = [
    {
      name: 'deluxe',
      features: ['Coffee machine', 'TV', 'fridge'],
      rooms: [
        {
          number: 21,
          price: 200,
          pictures: ['stringForPictures21_01', 'stringForPictures21_02'],
          additionalFeatures: ['green sheet'],
          beds: [
            {
              type: 'single'
            },
            {
              type: 'single'
            }
          ]
        },
        {
          number: 22,
          price: 250,
          pictures: ['stringForPictures22_01', 'stringForPictures22_02', 'stringForPictures22_03'],
          additionalFeatures: ['blue sheet'],
          beds: ''
        },
        {
          number: 23,
          price: 250,
          pictures: ['stringForPictures23_01', 'stringForPictures23_02'],
          additionalFeatures: ['yellow sheet'],
          beds: ''
        }
      ]
    },
    {
      name: 'standard',
      features: ['fridge'],
      rooms: [
        {
          number: 11,
          price: 100,
          pictures: ['stringForPictures11_01', 'stringForPictures11_02'],
          additionalFeatures: ['green sheet'],
          beds: ''
        },
        {
          number: 12,
          price: 150,
          pictures: ['stringForPictures12_01', 'stringForPictures12_02', 'stringForPictures12_03'],
          additionalFeatures: ['blue sheet'],
          beds: ''
        },
        {
          number: 13,
          price: 150,
          pictures: ['stringForPictures13_01', 'stringForPictures13_02'],
          additionalFeatures: ['yellow sheet'],
          beds: ''
        }
      ]
    }
  ]
  await RoomsCategory.deleteMany({})
  const insCategories = await RoomsCategory.insertMany(categories)
  console.log(insCategories)
}

seedDB().then(() => {
  mongoose.connection.close()
})

module.exports = {
  seedDB
}
