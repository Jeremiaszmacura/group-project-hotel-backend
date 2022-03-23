const getAll = (req, res) => {
  return res.json('getAll')
}

const getOne = (req, res) => {
  return res.json('getOne')
}

const getRoomsFilter = (req, res) => {
  return res.json('getRoomsFilter')
}

const getCategories = (req, res) => {
  return res.json('getCategories')
}

const createCategory = (req, res) => {
  return res.json('createCategory')
}

const createRoom = (req, res) => {
  return res.json('createRoom')
}

const updateCategory = (req, res) => {
  return res.json('updateCategory')
}

const updateRoom = (req, res) => {
  return res.json('updateRoom')
}

const removeCategory = (req, res) => {
  return res.json('removeCategory')
}

module.exports = {
  getAll,
  getOne,
  getRoomsFilter,
  getCategories,
  createCategory,
  createRoom,
  updateCategory,
  updateRoom,
  removeCategory
}
