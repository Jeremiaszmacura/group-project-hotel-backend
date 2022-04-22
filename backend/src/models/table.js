const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema({
  id: {
    type: Number,
    required: 'Kindly enter the id for table',
    unique: true
  },
  seats: {
    type: Number,
    required: 'Kindly enter the seats number for table'
  }
})

const Table = mongoose.model('Table', TableSchema)

module.exports = {
  Table
}
