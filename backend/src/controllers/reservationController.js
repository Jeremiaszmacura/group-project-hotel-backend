const { User } = require('../models/user')
const { TablesCalendar } = require('../models/tablesCalendar')
const { Table } = require('../models/table')

const oneHour = 60 * 60 * 1000

const getAll = (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    let allReservations = []
    for (const i in data) {
      allReservations = [...allReservations, ...data[i].reservations]
    }
    return res.status(200).json(allReservations)
  })
}

const getOne = (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.json('No user in database')
    }
    let reservation = null
    for (const i in data) {
      reservation = data[i].reservations.find(element => element.id.toString() === req.params.id.toString())
      if (reservation) break
    }
    if (!reservation) {
      return res.json('No reservation in database')
    }
    return res.json(reservation)
  })
}

const getReservationsFilter = (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.json('No user in database')
    }
    let allFilteredReservations = []
    for (const i in data) {
      const filteredReservations = data[i].rooms
        .filter(reservation =>
          (reservation.startsAt >= req.query.startDay && reservation.startsAt <= req.query.endDay) ||
            (reservation.endsAt >= req.query.startDay && reservation.endsAt <= req.query.endDay))
      allFilteredReservations = [...allFilteredReservations, ...filteredReservations]
    }
    return res.json(allFilteredReservations)
  })
}

const createReservation = (req, res) => {
  const hourFrom = new Date(req.body.startsAt)
  const hourTo = new Date(req.body.endsAt)
  req.body.dates.array.forEach(date => {
    for(let i = 0; i <= (hourTo - hourFrom) / oneHour; i++) {
       for(let j = 0; j < req.body.tablesIds.length; j++) {
         const checkAvability = await checkAvalibilityOfTable(res, req.body.tablesIds[j], new Date(dateFrom.getTime() + i * oneHour))
         if(checkAvability === false) {
          return res.json('Unavailable - already reserved')
         }
       }
    }
  })
  
  for(let i = 0; i <= (hourTo - hourFrom) / oneHour; i++) {
    TablesCalendar.findOne({hour: new Date(hourFrom.getTime() + i * oneHour)}, async (error, data) => {
      if (error) {
        console.log(error)
        return res.json('something went wrong')
      }
      for(let j = 0; j < req.body.tablesIds.length; j++) {
        const pos = data.tables.map(e => e.table.toString()).indexOf(req.body.tablesIds[j])
        data.tables[pos].avalibility = false
      }
      await data.save()
    })
  }

  const reservation = {
    startsAt: req.body.startsAt,
    endsAt: req.body.endsAt,
    numberOfPeople: req.body.numberOfPeople,
    tables: req.body.tablesIds
  }

  try {
    await User.findOneAndUpdate({_id: req.user._id}, {$push: {reservations: reservation}}, {
      new: true,
      runValidators: true
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
  return res.json('reservation created')
}

const removeReservation = (req, res) => {
  User.findOne({ _id: req.user._id }, async (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json({ error: 'No user found' })
    }
    const pos = data.reservations.map(e => e._id.toString()).indexOf(req.params.id)
    if(pos !== -1) {
      const hourFrom = new Date(data.reservations[pos].startsAt)
      const hourTo = new Date(data.reservations[pos].endsAt)
      const reservation = data.reservations[pos]
      for(let i = 0; i <= (hourTo - hourFrom) / oneHour; i++) {
        const data2 = await TablesCalendar.findOne({ hour: new Date(hourFrom.getTime() + i * oneHour)})
        if (error) {
          console.log(error)
          return res.json('something went wrong')
        }
        for(let j = 0; j < reservation.tables.length; j++) {
          const pos2 = data2.tables.map(e => e.room.toString()).indexOf(reservation.tables[j].toString())
          data2.tables[pos2].avalibility = true
        }
        await data2.save()
      }
      data.reservations.splice(pos, 1)
      data.save()
      .then(() => {
        return res.status(200).json('Reservation removed')
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json('something went wrong')
      })
    } else {
      return res.status(404).json('No reservation')
    }
  })
}

const checkAvalibilityOfTable = async (res, tableId, hour) => {
  let tablesCalendar = await checkCalendar(res, hour)
  if(!tablesCalendar) {
    const allTables = await Table.find({})
    const tablesJson = {
      date: hour,
      tables: []
    }
    for(let i = 0; i < allTables.length; i++) {
      tablesJson.tables = [...tablesJson.tables, {
        id: allTables[i]._id,
        seats: allTables[i].seats,
        avalibility: true
      }]
    }
    tablesCalendar = new TablesCalendar(tablesJson)
    const _tablesCalendar = new TablesCalendar(tablesCalendar)
    await _tablesCalendar.save()
    return true
  }
  const pos = tablesCalendar.tables.map(function (e) {
    return e.table.toString()
  }).indexOf(tableId)
  if(pos !== -1) {
    if(!tablesCalendar.tables[pos].avalibility) {
      return false 
    }
    return true
  }
}

const checkCalendar = async (res, hour) => {
  const data = await TablesCalendar.findOne({date: hour})
  if(data) {
    return data
  }
  return null
}

module.exports = {
  getAll,
  getOne,
  getReservationsFilter,
  createReservation,
  removeReservation
}
