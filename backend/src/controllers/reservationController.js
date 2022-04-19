const { User } = require('../models/user')

const getAll = (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    let allReservations = []
    for (const i in data) {
      allReservations = [...allReservations, ...data[i].reservations]
    }
    return res.status(200).json(allReservations)
  })
}

const getOne = (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.json('No user in database')
    }
    let reservation = null
    for (const i in data) {
      reservation = data[i].reservations.find(element => element.id.toString() === req.params.id.toString())
      if (reservation) break
    }
    if (!reservation) {
      return res.json('No reservation in database')
    }
    return res.json(reservation)
  })
}

const getReservationsFilter = (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.json('No user in database')
    }
    let allFilteredReservations = []
    for (const i in data) {
      const filteredReservations = data[i].rooms
        .filter(reservation =>
          (reservation.startsAt >= req.query.startDay && reservation.startsAt <= req.query.endDay) ||
            (reservation.endsAt >= req.query.startDay && reservation.endsAt <= req.query.endDay))
      allFilteredReservations = [...allFilteredReservations, ...filteredReservations]
    }
    return res.json(allFilteredReservations)
  })
}

const createReservation = (req, res) => {
  req.body.dates.array.forEach(date => {
  })
  return res.json('createReservation')
}

const updateReservation = (req, res) => {
  return res.json('updateReservation')
}

const removeReservation = (req, res) => {
  return res.json('removeReservation')
}

module.exports = {
  getAll,
  getOne,
  getReservationsFilter,
  createReservation,
  updateReservation,
  removeReservation
}
