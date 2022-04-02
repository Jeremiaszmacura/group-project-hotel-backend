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
  return res.json('getOne')
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
