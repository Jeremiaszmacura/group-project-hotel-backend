const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataWareHouseSchema = new mongoose.Schema({
  todaysCustomersNumber: {
    type: Number
  },
  todaysAvgRating: {
    type: Number
  },
  topCustomers: [{
    type: Schema.Types.ObjectId
  }],
  topRooms: [{
    type: Schema.Types.ObjectId
  }],
  bottomRooms: [{
    type: Schema.Types.ObjectId
  }],
  computationMoment: {
    type: Date,
    default: Date.now
  },
  rebuildPeriod: {
    type: String
  }
}, { strict: false })

DataWareHouseSchema.index({ computationMoment: -1 })

const DataWareHouse = mongoose.model('DataWareHouse', DataWareHouseSchema)

module.exports = { DataWareHouse }
