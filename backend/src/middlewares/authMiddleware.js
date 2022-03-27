const passport = require('passport')
const { User } = require('../models/user')

const checkIsInRole = (...roles) => async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send()
  }
  const userDocument = await User.findById(req.user._id)
  if (!userDocument) {
    return res.status(401).send()
  }
  const hasRole = roles.find(role => userDocument.role.includes(role))
  if (!hasRole) {
    return res.status(403).send('Not enough privileges')
  }
  return next()
}
const isLoggedIn = passport.authenticate('jwt', { session: false })

module.exports = {
  checkIsInRole,
  isLoggedIn
}
