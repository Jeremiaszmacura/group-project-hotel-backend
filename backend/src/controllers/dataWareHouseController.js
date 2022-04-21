const async = require('async')
const { DataWareHouse } = require('../models/dataWareHouseModel')
const { User } = require('../models/user')

const listIndicators = async (req, res) => {
  try {
    const indicators = await DataWareHouse.find().sort('-computationMoment')
    res.json(indicators)
  } catch (err) {
    res.status(500).send(err)
  }
}

const lastIndicator = async (req, res) => {
  try {
    const lastIndicators = await DataWareHouse.find().sort('-computationMoment').limit(1)
    res.json(lastIndicators)
  } catch (err) {
    res.status(500).send(err)
  }
}

const CronJob = require('cron').CronJob
const CronTime = require('cron').CronTime

// '0 0 * * * *' every hour
// '*/30 * * * * *' every 30 seconds
// '*/10 * * * * *' every 10 seconds
// '* * * * * *' every second
let rebuildPeriod = '*/10 * * * * *' // By default, every 30 sgs
let computeDataWareHouseJob

const setRebuildPeriod = (req, res) => {
  console.log('Updating rebuild period. Request: period:' + req.body.rebuildPeriod)
  rebuildPeriod = req.body.rebuildPeriod
  computeDataWareHouseJob.setTime(new CronTime(rebuildPeriod))
  computeDataWareHouseJob.start()

  res.json(req.body.rebuildPeriod)
}

const createDataWareHouseJob = () => {
  computeDataWareHouseJob = new CronJob(rebuildPeriod, async function () {
    const newDataWareHouse = new DataWareHouse()
    console.log('Cron job submitted. Rebuild period: ' + rebuildPeriod)
    try {
      const results = await async.parallel([
        computeTopCustomers,
        topRooms
      ])
      newDataWareHouse.topCustomers = results[0]
      newDataWareHouse.topRooms = results[1]
      newDataWareHouse.rebuildPeriod = rebuildPeriod

      await newDataWareHouse.save()
      console.log('new DataWareHouse succesfully saved. Date: ' + new Date())
    } catch (err) {
      console.log('Error computing DataWareHouse: ' + err)
    }
  }, null, true, 'Europe/Madrid')
}

const computeTopCustomers = (callback) => {
  User.aggregate([
    { $unwind: '$bookings' },
    {
      $group: {
        _id: '$_id', total: { $sum: '$bookings.price' }
      }
    },
    {
      $sort: { total: -1 }
    },
    {
      $limit: 10
    },
    {
      $project: { _id: 1 }
    }
  ], function (err, res) {
    callback(err, res)
  })
}

const topRooms = (callback) => {
  User.aggregate([
    {
      $group: { _id: '$bookings.rooms' }
    },
    { $unwind: '$_id' },
    { $unwind: '$_id' },
    {
      $group: { _id: '$_id', total: { $sum: 1 } }
    },
    { $sort: { total: -1 } },
    { $limit: 10 }
  ], function (err, res) {
    callback(err, res)
  })
}

module.exports = {
  listIndicators,
  lastIndicator,
  setRebuildPeriod,
  createDataWareHouseJob,
  computeTopCustomers,
  topRooms
}
