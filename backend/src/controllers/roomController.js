const { RoomsCategory } = require('../models/roomsCategory')

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
      return res.json('No category in database')
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
  RoomsCategory.find({}, async (error, data) => {
    if (error) {
      return res.json(error)
    }
    if (!data) {
      return res.json({ error: 'No room categories in database' })
    }
    for (let i = 0; i < data.length; i++) {
      const pos = data[i].rooms.map(function (e) {
        return e._id.toString()
      }).indexOf(req.params.id)
      if (pos !== -1) {
        for (const field in req.body) {
          data[i].rooms[pos][field] = req.body[field]
        }
        await data[i].save()
          .then((data) => {
            return res.status(200).json(data)
          })
          .catch((error) => {
            console.log(error)
            return res.status(500).json('something went wrong')
          })
      }
    }
  })
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

const removeRoom = async (req, res) => {
  RoomsCategory.find({}, async (error, data) => {
    if (error) {
      return res.json(error)
    }
    if (!data) {
      return res.json({ error: 'No room categories in database' })
    }
    for (let i = 0; i < data.length; i++) {
      const pos = data[i].rooms.map(function (e) {
        return e._id.toString()
      }).indexOf(req.params.id)
      if (pos !== -1) {
        data[i].rooms.splice(pos, 1)
        await data[i].save()
          .then((data) => {
            return res.status(200).json(data)
          })
          .catch((error) => {
            console.log(error)
            return res.status(500).json('something went wrong')
          })
      }
    }
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
  removeCategory,
  removeRoom
}
