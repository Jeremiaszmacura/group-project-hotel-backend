const { Table } = require('../models/table')

const getAll = (req, res) => {
  Table.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }
    if (!data) {
      return res.json({ error: 'No table in database' })
    }
    res.json(data)
  })
}

const getOne = (req, res) => {
  Table.findOne({__id: req.params.id}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json()
    }

    if (!data) {
      return res.json({ error: 'No table in database' })
    }
    res.json(data)
  })
}

const getTablesFilter = (req, res) => {
  return res.json('getTablesFilter')
}

const createTable = (req, res) => {
  return res.json('createTable')
}

const updateTable = (req, res) => {
  return res.json('updateTable')
}

const removeTable = (req, res) => {
  return res.json('removeTable')
}

module.exports = {
  getAll,
  getOne,
  getTablesFilter,
  createTable,
  updateTable,
  removeTable
}
