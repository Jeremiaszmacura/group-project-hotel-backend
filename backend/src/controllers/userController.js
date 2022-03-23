const { User } = require('../models/user')

const getAll = (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }
    if (!data) {
      return res.json({ error: 'No users in database' })
    }
    res.json(data)
  })
}

const getOne = (req, res) => {
  return res.json('getOne')
}

const createUser = (req, res) => {
  const user = new User(req.body)

  user.save()
    .then((data) => {
      res.json(`Account for email: ${data.email} has beed created. Welcome ${data.name}!`)
    })
    .catch((error) => {
      console.log(error)
      if (error.code === 11000) {
        return res.json('This email is already in use')
      }
      return res.json('something went wrong')
    })
}

const updateUser = (req, res) => {
  return res.json('updateUser')
}

const removeUser = (req, res) => {
  return res.json('removeUser')
}

module.exports = {
  getAll,
  getOne,
  createUser,
  updateUser,
  removeUser
}
