const mongoose = require('mongoose')

// MongoDB URI building
const mongoDBUser = process.env.DATABASE_USERNAME || 'hotel-admin'
const mongoDBPass = process.env.DATABASE_PASSWORD || 'hotel-admin'
const mongoDBCredentials = (mongoDBUser && mongoDBPass) ? mongoDBUser + ':' + mongoDBPass + '@' : ''

const mongoDBHostname = process.env.DATABASE_HOST || 'localhost'
const mongoDBPort = process.env.DATABASE_PORT || '27017'
const mongoDBName = process.env.DATABASE_NAME || 'hotel'

const mongoDBURI = 'mongodb://' + mongoDBCredentials + mongoDBHostname + ':' + mongoDBPort + '/' + mongoDBName

mongoose.connect(mongoDBURI, {
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true
})
