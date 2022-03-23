const getAll = (req, res) => {
  return res.json('getAll')
}

const getOne = (req, res) => {
  return res.json('getOne')
}

const getBookingsFilter = (req, res) => {
  return res.json('getBookingsFilter')
}

const createBooking = (req, res) => {
  return res.json('createBooking')
}

const updateBooking = (req, res) => {
  return res.json('updateBooking')
}

const removeBooking = (req, res) => {
  return res.json('removeBooking')
}

module.exports = {
  getAll,
  getOne,
  getBookingsFilter,
  createBooking,
  updateBooking,
  removeBooking
}
