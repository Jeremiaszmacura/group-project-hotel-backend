const passport = require('passport')
const jwt = require('jsonwebtoken')

const { User } = require('../models/user')

// Authorization
const signup = async (req, res, next) => {
  passport.authenticate('signup', { session: false },
    async (err, user) => {
      if (err) {
        if (err.code === 11000) {
          return res.json('This email is already in use')
        }
        const error = new Error('An error occurred: ' + err)
        return next(error)
      }
      return res.json(user)
    }
  )(req, res, next)
}

const login = async (req, res, next) => {
  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err) {
          const error = new Error('An error occurred: ' + err)
          return next(error)
        } else if (!user) {
          return res.status(401).json({ error: info.message })
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error)

            const body = { _id: user._id, email: user.email }
            const token = jwt.sign({ user: body }, 'TOP_SECRET')

            return res.json({ token })
          }
        )
      } catch (error) {
        return next(error)
      }
    }
  )(req, res, next)
}

const validateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: { validated: 'true' } }, { new: true, runValidators: true })
    user ? res.json(user) : res.status(404).send()
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
}

// All other controllers
const getAll = (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }
    if (!data) {
      return res.json([{ error: 'No users in database' }])
    }
    return res.json(data)
  })
}

const getOne = (req, res) => {
  User.findOne({ _id: req.params.id }, (error, data) => {
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

const updateUser = (req, res) => {
  return res.json('updateUser')
}

const removeUser = (req, res) => {
  return res.json('removeUser')
}

module.exports = {
  signup,
  login,
  validateUser,
  getAll,
  getOne,
  updateUser,
  removeUser
}
