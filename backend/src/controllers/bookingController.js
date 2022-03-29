const { User } = require('../models/user')
const { RoomsCalendar } = require('../models/roomsCalendar')
const { RoomsCategory } = require('../models/roomsCategory')

const getAll = (req, res) => {
  return res.json('getAll')
}

const getUserAll = (req, res) => {
  console.log(req.user)
  User.findOne({ _id: req.user._id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }
    if (!data) {
      return res.json({ error: 'No users in database' })
    }
    res.json(data.bookings)
  })
}

const getOne = (req, res) => {
  return res.json('getOne')
}

const getBookingsFilter = (req, res) => {
  return res.json('getBookingsFilter')
}

const createBooking = async (req, res) => {
  const roomsCategory = await RoomsCategory.find({})
  let allRooms = []
  for (const category in roomsCategory) {
    allRooms = [...allRooms, ...roomsCategory[category].rooms]
  }

  RoomsCalendar.findOne({ date: req.body.date }, async (error, data) => {
    let roomCalendar
    if (error) {
      console.log(error)
      return res.json(error)
    }
    if (!data) {
      const roomsJson = {
        date: req.body.date,
        rooms: []
      }
      for (let i = 0; i < allRooms.length; i++) {
        roomsJson.rooms = [...roomsJson.rooms, {
          room: allRooms[i]._id,
          user: null
        }]
      }
      roomCalendar = new RoomsCalendar(roomsJson)
      const _roomCalendar = new RoomsCalendar(roomCalendar)
      data = await _roomCalendar.save()
    }
    return res.json(data)
  })
}

const updateBooking = (req, res) => {
  return res.json('updateBooking')
}

const removeBooking = (req, res) => {
  return res.json('removeBooking')
}

module.exports = {
  getAll,
  getUserAll,
  getOne,
  getBookingsFilter,
  createBooking,
  updateBooking,
  removeBooking
}
