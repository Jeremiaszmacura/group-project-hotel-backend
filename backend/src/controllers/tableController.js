const { Table } = require('../models/table')

const getAll = (req, res) => {
  Table.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json('something went wrong')
    }
    if (!data) {
      return res.json({ error: 'No tables in database' })
    }
    res.json(data)
  })
}

const getOne = (req, res) => {
  Table.findOne({ __id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.json('something went wrong')
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

const updateTable = async (req, res) => {
  try {
    const data = await Table.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    data ? res.json(data) : res.status(404).send()
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
}

const removeTable = (req, res) => {
  Table.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.json('something went wrong')
    }
    if (!data) {
      return res.json('No table in database')
    }
    data.remove()
    return res.json('Table deleted')
  })
}

module.exports = {
  getAll,
  getOne,
  getTablesFilter,
  createTable,
  updateTable,
  removeTable
}
