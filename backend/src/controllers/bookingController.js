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
  const roomsCategory = await RoomsCategory.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }
    if (!data) {
      return res.json({ error: 'There are no categories in database' })
    }
  })
  const allRooms = []

  RoomsCalendar.find({ date: req.body.date }, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }
    if (!data) {
      const roomsJson = {
        date: req.body.date,
        rooms: []
      }
      for (let i = 0; i < 31; i++) {

      }
      const roomCalendar = new RoomsCalendar(req.body.date)
      return res.json({ error: 'No users in database' })
    }
    res.json(data.bookings)
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
