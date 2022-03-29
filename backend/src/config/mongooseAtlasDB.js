const mongoose = require('mongoose')

// MongoDB URI building
const mongoDBUser = process.env.DATABASE_USERNAME_ATLAS || 'hotel-admin'
const mongoDBPass = process.env.DATABASE_PASSWORD_ATLAS || 'hotel-admin'
const mongoDBCredentials = (mongoDBUser && mongoDBPass) ? mongoDBUser + ':' + mongoDBPass + '@' : ''
const mongoDBName = process.env.DATABASE_NAME_ATLAS || 'Hotel'

const mongoDBURI = 'mongodb+srv://' + mongoDBCredentials + 'hotel.munmc.mongodb.net/' + mongoDBName + '?retryWrites=true&w=majority'

mongoose.connect(mongoDBURI, {
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true
})
