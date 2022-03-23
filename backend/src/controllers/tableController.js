const getAll = (req, res) => {
  return res.json('getAll')
}

const getOne = (req, res) => {
  return res.json('getOne')
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
