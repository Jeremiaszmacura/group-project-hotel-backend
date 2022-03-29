const { RoomsCategory } = require('../models/roomsCategory')
const { Room } = require('../models/room')

const getAll = (req, res) => {
  Room.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }
    if (!data) {
      return res.json({ error: 'No room categories in database' })
    }
    res.json(data)
  })
}

const getOne = (req, res) => {
  Room.findOne({ __id: req.params.id }, (error, data) => {
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

const getRoomsFilter = (req, res) => {
  return res.json('getRoomsFilter')
}

const getCategories = (req, res) => {
  RoomsCategory.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }
    if (!data) {
      return res.json({ error: 'No room categories in database' })
    }
    res.json(data)
  })
}

const createCategory = (req, res) => {
  const roomCategory = new RoomsCategory(req.body)

  roomCategory.save()
    .then((data) => {
      res.json(`Account for email: ${data.email} has beed created. Welcome ${data.name}!`)
    })
    .catch((error) => {
      console.log(error)
      return res.json('something went wrong')
    })
}

const createRoom = async (req, res) => {
  const categoryName = req.body.categoryName
  delete req.body.categoryName
  const beds = []
  for (let i = 0; i < req.body.single; i++) {
    beds.push({ type: 'single' })
  }
  delete req.body.single

  for (let i = 0; i < req.body.double; i++) {
    beds.push({ type: 'double' })
  }
  delete req.body.double
  req.body.beds = beds
  try {
    const room = await RoomsCategory.findOneAndUpdate({ name: categoryName }, { $push: { rooms: req.body } }, { new: true, runValidators: true })
    room ? res.json(room) : res.status(404).send()
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
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
