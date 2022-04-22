const mongoose = require('mongoose')

const { User } = require('../models/user')
const { RoomsCategory } = require('../models/roomsCategory')
const { RoomsCalendar } = require('../models/roomsCalendar')

// connect mongoose
require('../config/mongooseLocalDB')
// require('./config/mongooseAtlasDB')

// seed database
const seedDB = async () => {
  // seed categories with rooms and beds
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
          beds: [
            {
              type: 'single'
            },
            {
              type: 'double'
            }
          ]
        },
        {
          number: 23,
          price: 250,
          pictures: ['stringForPictures23_01', 'stringForPictures23_02'],
          additionalFeatures: ['yellow sheet'],
          beds: [
            {
              type: 'double'
            },
            {
              type: 'double'
            }
          ]
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
          number: 12,
          price: 150,
          pictures: ['stringForPictures12_01', 'stringForPictures12_02', 'stringForPictures12_03'],
          additionalFeatures: ['blue sheet'],
          beds: [
            {
              type: 'single'
            },
            {
              type: 'double'
            }
          ]
        },
        {
          number: 13,
          price: 150,
          pictures: ['stringForPictures13_01', 'stringForPictures13_02'],
          additionalFeatures: ['yellow sheet'],
          beds: [
            {
              type: 'double'
            },
            {
              type: 'double'
            }
          ]
        }
      ]
    }
  ]
  await RoomsCategory.deleteMany({})
  const insCategories = await RoomsCategory.insertMany(categories)
  console.log(insCategories)

  // seed users
  const users = [
    {
      name: 'Adam',
      surname: 'Kowalsky',
      phoneNumber: '123123123',
      address: 'main street 1',
      email: 'adam@email.com',
      password: '12345678',
      role: 'ADMIN',
      validated: true
    },
    {
      name: 'Jan',
      surname: 'Kowalsky',
      phoneNumber: '123123123',
      address: 'main street 2',
      email: 'jan@email.com',
      password: '12345678',
      role: 'CLERK',
      validated: true
    },
    {
      name: 'John',
      surname: 'Kowalsky',
      phoneNumber: '123123123',
      address: 'main street 3',
      email: 'john@email.com',
      password: '12345678',
      role: 'CUSTOMER',
      validated: false,
      bookings: [
        {
          startsAt: '2020-01-05',
          endsAt: '2020-01-07',
          price: 300,
          comment: 'Where are curly braces in python?',
          numberOfPeople: 4,
          guestNames: ['Tom', 'Bob', 'Alice', 'Angela'],
          rooms: [insCategories[1].rooms[2].id]
        },
        {
          startsAt: '2020-01-20',
          endsAt: '2020-01-23',
          price: 600,
          comment: 'Javascript is undefined',
          numberOfPeople: 2,
          guestNames: ['John', 'Jack'],
          rooms: [insCategories[0].rooms[0].id]
        }
      ]
    },
    {
      name: 'Jack',
      surname: 'Kowalsky',
      phoneNumber: '123123123',
      address: 'main street 4',
      email: 'jack@email.com',
      password: '12345678',
      role: 'CUSTOMER',
      validated: false,
      bookings: [
        {
          startsAt: '2020-01-01',
          endsAt: '2020-01-02',
          price: 150,
          comment: 'Some comment is there',
          numberOfPeople: 3,
          guestNames: ['Jack', 'Mery', 'Jim'],
          rooms: [insCategories[1].rooms[1].id]
        },
        {
          startsAt: '2020-01-12',
          endsAt: '2020-01-13',
          price: 100,
          comment: 'Javascript is undefined v2',
          numberOfPeople: 2,
          guestNames: ['Jim', 'Jack'],
          rooms: [insCategories[1].rooms[0].id]
        }
      ]
    },
    {
      name: 'Alice',
      surname: 'Kowalska',
      phoneNumber: '123123123',
      address: 'main street 5',
      email: 'alice@email.com',
      password: '12345678',
      role: 'CUSTOMER',
      validated: false,
      bookings: [
        {
          startsAt: '2020-01-24',
          endsAt: '2020-01-28',
          price: 600,
          comment: 'Some comment is there from Alice',
          numberOfPeople: 3,
          guestNames: ['Alice', 'Mery', 'Lucy'],
          rooms: [insCategories[1].rooms[1].id]
        },
        {
          startsAt: '2020-02-10',
          endsAt: '2020-02-11',
          price: 100,
          comment: 'Some comment is there from Alice v2',
          numberOfPeople: 2,
          guestNames: ['Jim', 'Jack'],
          rooms: [insCategories[1].rooms[0].id]
        }
      ]
    }
  ]
  await User.deleteMany({})
  const insUsers = await User.insertMany(users)
  console.log(insUsers)

  // seed roomsCalendar
  const roomsCalendar = [
    {
      date: '2020-01-05',
      rooms: [
        {
          room: insCategories[1].rooms[2].id,
          user: insUsers[2]
        }
      ]
    },
    {
      date: '2020-01-06',
      rooms: [
        {
          room: insCategories[1].rooms[2].id,
          user: insUsers[2]
        }
      ]
    },
    {
      date: '2020-01-20',
      rooms: [
        {
          room: [insCategories[1].rooms[0].id],
          user: insUsers[2]
        }
      ]
    },
    {
      date: '2020-01-21',
      rooms: [
        {
          room: [insCategories[1].rooms[0].id],
          user: insUsers[2]
        }
      ]
    },
    {
      date: '2020-01-22',
      rooms: [
        {
          room: [insCategories[1].rooms[0].id],
          user: insUsers[2]
        }
      ]
    },
    {
      date: '2020-01-01',
      rooms: [
        {
          room: [insCategories[1].rooms[1].id],
          user: insUsers[3]
        }
      ]
    },
    {
      date: '2020-01-12',
      rooms: [
        {
          room: [insCategories[1].rooms[0].id],
          user: insUsers[3]
        }
      ]
    },
    {
      date: '2020-01-24',
      rooms: [
        {
          room: [insCategories[1].rooms[1].id],
          user: insUsers[4]
        }
      ]
    },
    {
      date: '2020-01-25',
      rooms: [
        {
          room: [insCategories[1].rooms[1].id],
          user: insUsers[4]
        }
      ]
    },
    {
      date: '2020-01-26',
      rooms: [
        {
          room: [insCategories[1].rooms[1].id],
          user: insUsers[4]
        }
      ]
    },
    {
      date: '2020-01-27',
      rooms: [
        {
          room: [insCategories[1].rooms[1].id],
          user: insUsers[4]
        }
      ]
    },
    {
      date: '2020-02-10',
      rooms: [
        {
          room: [insCategories[1].rooms[0].id],
          user: insUsers[4]
        }
      ]
    }
  ]
  await RoomsCalendar.deleteMany({})
  const insRoomsCalendar = await RoomsCalendar.insertMany(roomsCalendar)
  console.log(insRoomsCalendar)
}

seedDB().then(() => {
  mongoose.connection.close()
})

module.exports = {
  seedDB
}
