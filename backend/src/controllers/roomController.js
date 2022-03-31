const { RoomsCategory } = require('../models/roomsCategory')
const { RoomSchema } = require('../models/room')

const getAll = (req, res) => {
  RoomsCategory.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json('something went wrong')
    }
    if (!data.length) {
      return res.json('No rooms in database')
    }
    return res.json(data)
  })
}

const getOne = (req, res) => {
  RoomsCategory.findById(req.params.id, (error, data) => {
    if (error) {
      console.log(error)
      return res.json('something went wrong')
    }
    if (!data) {
      return res.json('No room in database')
    }
    return res.json(data)
  })
}

const getRoomsFilter = (req, res) => {
  return res.json('getRoomsFilter')
}

const getCategories = (req, res) => {
  RoomsCategory.find({}, (error, data) => {
    if (error) {
      return res.json(error)
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
      res.json(`Category: ${data.name} has been created.`)
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
    const roomsCategory = await RoomsCategory.findOneAndUpdate({ name: categoryName }, { $push: { rooms: req.body } }, { new: true, runValidators: true })
    roomsCategory ? res.json(roomsCategory) : res.status(404).send()
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
}

const updateCategory = async (req, res) => {
  try {
    const data = await RoomsCategory.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    data ? res.json(data) : res.status(404).send()
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
}

const updateRoom = async (req, res) => {
  try {
    const data = await RoomSchema.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    data ? res.json(data) : res.status(404).send()
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
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
