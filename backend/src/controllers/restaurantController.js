const { Restaurant } = require('../models/restaurant')

const getRestaurants = (req, res) => {
  Restaurant.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data.length) {
      return res.status(404).json([{ error: 'No restaurants in database' }])
    }
    return res.status(200).json(data)
  })
}

const getMenu = (req, res) => {
  Restaurant.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json([{ error: 'No restaurant in database' }])
    }
    return res.status(200).json(data.menu)
  })
}

const getDish = (req, res) => {
  Restaurant.findOne({ _id: req.params.restaurantId }, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json('No restaurant in database')
    }
    const dish = data.menu.find(element => element.id === req.params.dishId)
    if (!dish) {
      return res.status(404).json('No dish in menu')
    }
    return res.status(200).json(dish)
  })
}

const createDish = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate({ _id: req.params.id }, { $push: { menu: req.body } }, {
      new: true,
      runValidators: true
    })
    restaurant ? res.json(restaurant) : res.status(404).send()
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
}

const createRestaurant = (req, res) => {
  const restaurant = new Restaurant(req.body)
  restaurant.save()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json('something went wrong')
    })
}

const updateRestaurant = (req, res) => {
  Restaurant.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json('No restaurant in database')
    }
    for (const field in req.body) {
      data[field] = req.body[field]
    }
    data.save()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json('something went wrong')
      })
  })
}

const updateDish = (req, res) => {
  Restaurant.findOne({ _id: req.params.restaurantId }, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json('No restaurant in database')
    }
    const pos = data.menu.map(function (e) {
      return e._id.toString()
    }).indexOf(req.params.dishId)
    if (pos !== -1) {
      for (const field in req.body) {
        data.menu[pos][field] = req.body[field]
      }
      data.save()
        .then(() => {
          return res.status(200).json('Dish updated')
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json('something went wrong')
        })
    } else {
      return res.status(200).json('No dish in menu')
    }
  })
}

const removeDish = (req, res) => {
  Restaurant.findOne({ _id: req.params.restaurantId }, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json('No restaurant in database')
    }
    const pos = data.menu.map(function (e) {
      return e._id.toString()
    }).indexOf(req.params.dishId)
    if (pos !== -1) {
      data.menu.splice(pos, 1)
      data.save()
        .then(() => {
          return res.status(200).json('Dish removed from menu')
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json('something went wrong')
        })
    } else {
      return res.status(404).json('No dish in menu')
    }
  })
}

const removeRestaurant = (req, res) => {
  Restaurant.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json('No restaurant in database')
    }
    data.remove()
    return res.status(200).json('Restaurant deleted')
  })
}

module.exports = {
  getRestaurants,
  getMenu,
  getDish,
  createDish,
  createRestaurant,
  updateRestaurant,
  updateDish,
  removeDish,
  removeRestaurant
}
