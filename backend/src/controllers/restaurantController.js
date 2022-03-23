const getMenu = (req, res) => {
  return res.json('getMenu')
}

const getDish = (req, res) => {
  return res.json('getDish')
}

const getOpenHours = (req, res) => {
  return res.json('getOpenHours')
}

const createDish = (req, res) => {
  return res.json('createDish')
}

const createRestaurant = (req, res) => {
  return res.json('createRestaurant')
}

const updateRestaurant = (req, res) => {
  return res.json('updateRestaurant')
}

const updateDish = (req, res) => {
  return res.json('updateDish')
}

const removeDish = (req, res) => {
  return res.json('removeDish')
}

const removeRestaurant = (req, res) => {
  return res.json('removeRestaurant')
}

module.exports = {
  getMenu,
  getDish,
  getOpenHours,
  createDish,
  createRestaurant,
  updateRestaurant,
  updateDish,
  removeDish,
  removeRestaurant
}
