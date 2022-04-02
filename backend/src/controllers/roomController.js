const { RoomsCategory } = require('../models/roomsCategory')
const { RoomSchema } = require('../models/room')

const getAll = (req, res) => {
  RoomsCategory.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json('something went wrong')
    }
    if (!data.length) {
      return res.json('No room categories in database')
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
  RoomsCategory.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    let allFilteredRooms = []
    for (const i in data) {
      const filteredRooms = data[i].rooms.filter(room => room.price >= req.query.priceFrom && room.price <= req.query.priceTo)
      allFilteredRooms = [...allFilteredRooms, ...filteredRooms]
    }
    return res.json(allFilteredRooms)
  })
}

const getRooms = (req, res) => {
  RoomsCategory.find({}, (error, data) => {
    if (error) {
      return res.json(error)
    }
    if (!data) {
      return res.json({ error: 'No room categories in database' })
    }
    let allRooms = []
    for (const i in data) {
      allRooms = [...allRooms, ...data[i].rooms]
    }
    res.json(allRooms)
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
  RoomsCategory.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.json('something went wrong')
    }
    if (!data) {
      return res.json('No category in database')
    }
    data.remove()
    return res.json('Category deleted')
  })
}

const getOneRoom = (req, res) => {
  RoomsCategory.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.json('No rooms categories in database')
    }
    let room = null
    for (const i in data) {
      room = data[i].rooms.find(element => element.id.toString() === req.params.id.toString())
      if (room) break
    }
    if (!room) {
      return res.json('No room in database')
    }
    return res.json(room)
  })
}

module.exports = {
  getAll,
  getOne,
  getOneRoom,
  getRoomsFilter,
  getRooms,
  createCategory,
  createRoom,
  updateCategory,
  updateRoom,
  removeCategory
}
