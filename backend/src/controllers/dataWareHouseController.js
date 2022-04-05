const async = require('async')
const mongoose = require('mongoose')
const { dataWareHouse } = require('../models/dataWareHouseController')

const listIndicators = async (req, res) => {
  try {
    const indicators = await dataWareHouse.find().sort('-computationMoment')
    res.json(indicators)
  } catch (err) {
    res.status(500).send(err)
  }
}

const lastIndicator = async (req, res) => {
  try {
    const lastIndicators = await dataWareHouse.find().sort('-computationMoment').limit(1)
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
let rebuildPeriod = '*/30 * * * * *' // By default, every 30 sgs
let computeDataWareHouseJob

const setRebuildPeriod = (req, res) => {
  console.log('Updating rebuild period. Request: period:' + req.body.rebuildPeriod)
  rebuildPeriod = req.body.rebuildPeriod
  computeDataWareHouseJob.setTime(new CronTime(rebuildPeriod))
  computeDataWareHouseJob.start()

  res.json(req.body.rebuildPeriod)
}

// const createDataWareHouseJob = () => {
//   computeDataWareHouseJob = new CronJob(rebuildPeriod, async function () {
//     const newDataWareHouse = new DataWareHouseModel()
//     console.log('Cron job submitted. Rebuild period: ' + rebuildPeriod)
//     try {
//       const results = await async.parallel([
//         computeTopCancellers,
//         computeTopNotCancellers,
//         computeBottomNotCancellers,
//         computeTopClerks,
//         computeBottomClerks,
//         computeRatioCancelledOrders
//       ])
//       newDataWareHouse.topCancellers = results[0]
//       newDataWareHouse.topNotCancellers = results[1]
//       newDataWareHouse.bottomNotCancellers = results[2]
//       newDataWareHouse.topClerks = results[3]
//       newDataWareHouse.bottomClerks = results[4]
//       newDataWareHouse.ratioCancelledOrders = results[5]
//       newDataWareHouse.rebuildPeriod = rebuildPeriod

//       await newDataWareHouse.save()
//       console.log('new DataWareHouse succesfully saved. Date: ' + new Date())
//     } catch (err) {
//       console.log('Error computing datawarehouse: ' + err)
//     }
//   }, null, true, 'Europe/Madrid')
// }

// const computeTopCustomers = () => {
//     callback(err, res[0].top)
// }

module.exports = {
  listIndicators,
  lastIndicator,
  setRebuildPeriod,
  createDataWareHouseJob
}
