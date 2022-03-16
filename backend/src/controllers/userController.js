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

const createUser = async (req, res) => {
  const user = await User.create({
    name: 'janek',
    surname: 'Kowalski',
    phoneNumber: '111222333',
    address: 'adress',
    email: 'email@email.com',
    password: '1234',
    role: 'CUSTOMER'
  })
  res.json(user)
}

module.exports = {
  getAll,
  createUser
}
