const getAll = (req, res) => {
  return res.json('getAll')
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
