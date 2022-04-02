const { User } = require('../models/user')
const { RoomsCalendar } = require('../models/roomsCalendar')
const { RoomsCategory } = require('../models/roomsCategory')

const getAll = (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    let allBookings = []
    for (const i in data) {
      allBookings = [...allBookings, ...data[i].bookings]
    }
    return res.json(allBookings)
  })
}

const getUserAll = (req, res) => {
  User.findOne({ _id: req.user._id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json({ error: 'No user found' })
    }
    res.json(data.bookings)
  })
}

const getOne = (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json('No users in database')
    }
    let booking = null
    for (const i in data) {
      booking = data[i].bookings.find(element => element.id.toString() === req.params.id.toString())
      if (booking) break
    }
    if (!booking) {
      return res.status(404).json('No such a booking in database')
    }
    return res.status(200).json(booking)
  })
}

const getBookingsFilter = (req, res) => {
  return res.json('getBookingsFilter')
}

const createBooking = async (req, res) => {
  for (let i = 0; i < req.body.dates.length; i++) {
    for (let j = 0; j < req.body.roomsIds.length; j++) {
      const checkAvailability = await checkAvailabilityOfRoom(res, req.body.roomsIds[j], req.body.dates[i])
      if (checkAvailability === false) {
        return res.json('Unavailable - already reserved')
      }
    }
  }

  let price = 0.0
  const roomsCategory = await RoomsCategory.find({})
  let allRooms = []
  for (const category in roomsCategory) {
    allRooms = [...allRooms, ...roomsCategory[category].rooms]
  }
  for (let i = 0; i < req.body.roomsIds.length; i++) {
    const pos = allRooms.map(function (e) {
      return e.id.toString()
    }).indexOf(req.body.roomsIds[i])
    price += allRooms[pos].price
  }
  for (let i = 0; i < req.body.dates.length; i++) {
    RoomsCalendar.findOne({ date: req.body.dates[i] }, async (error, data) => {
      if (error) {
        console.log(error)
        return res.json('something went wrong')
      }
      for (let j = 0; j < req.body.roomsIds.length; j++) {
        const pos = data.rooms.map(function (e) {
          return e.room.toString()
        }).indexOf(req.body.roomsIds[j])
        data.rooms[pos].user = req.user._id
      }
      await data.save()
    })
  }
  const booking = {
    startsAt: req.body.dates[0],
    endsAt: req.body.dates[req.body.dates.length - 1],
    price: price,
    comment: req.body.comment,
    numberOfPeople: req.body.numberOfPeople,
    guestNames: req.body.guestNames,
    rooms: req.body.roomsIds
  }

  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { $push: { bookings: booking } }, {
      new: true,
      runValidators: true
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
  return res.json('Done')
}

const updateBooking = (req, res) => {
  return res.json('updateBooking')
}

const removeBooking = (req, res) => {
  return res.json('removeBooking')
}

const checkAvailabilityOfRoom = async (res, roomId, date) => {
  let roomCalendar = await checkCalendar(res, date)
  if (!roomCalendar) {
    const roomsCategory = await RoomsCategory.find({})
    let allRooms = []
    for (const category in roomsCategory) {
      allRooms = [...allRooms, ...roomsCategory[category].rooms]
    }
    const roomsJson = {
      date: date,
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
    await _roomCalendar.save()
    return true
  }
  const pos = roomCalendar.rooms.map(function (e) {
    return e.room.toString()
  }).indexOf(roomId)
  if (pos !== -1) {
    if (roomCalendar.rooms[pos].user) {
      return false
    }
    return true
  }
  return res.json('No room in calendar')
}

const checkCalendar = async (res, date) => {
  const data = await RoomsCalendar.findOne({ date: date })
  if (data) {
    return data
  }
  return null
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
