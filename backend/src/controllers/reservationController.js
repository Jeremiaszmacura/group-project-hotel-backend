const { Reservation } = require('../models/reservation')

const getAll = (req, res) => {
  Reservation.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }
    if (!data) {
      return res.json({ error: 'No table in database' })
    }
    res.json(data)
  })
}

const getOne = (req, res) => {
  Reservation.findOne({ __id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }
    if (!data) {
      return res.json({ error: 'No table in database' })
    }
    res.json(data)
  })
}

const getReservationsFilter = (req, res) => {
  return res.json('getReservationsFilter')
}

const createReservation = (req, res) => {
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
