// IMPORT AND CONFIGURE ENV VARIABLES
require('dotenv').config()

// IMPORT EXTERNAL LIBRARIES
const express = require('express')
const mongoose = require('mongoose')

// IMPORT INTERNAL LIBRARIES

// VARIABLES
const app = express()
const port = process.env.PORT || 4000;  // eslint-disable-line

// MIDDLEWARE
app.use(express.urlencoded({ extended: false })) // takes all url encoded data and parse to object, which we can use in request object (req.body)
app.use(express.json()) // all data send to api will be able to access as a json
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use((req, res) => {
  res.status(404).send('404 Error')
})
app.use(function (err, req, res) {
  console.log(err)
  res.status(500).send('500 Server Error')
})

// CONNECT TO DATABASE AND RUN SERVER
if (require.main === module) {
    mongoose.connect(process.env.DATABASE_URL)  // eslint-disable-line
    .then(() => app.listen(port, () => {
      console.log(`[SERVER] listening on port ${port}...`) // after successful connection with database, sever start listening
      console.log(`[SERVER] URL: http://localhost:${port}`)
      console.log(`[SERVER] Database state: ${mongoose.connection.readyState}`)
    }))
    .catch((err) => console.log(err))
}

module.exports = app
