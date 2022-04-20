const express = require('express')
const tableController = require('../controllers/tableController')

const router = express.Router()

router.get('/', tableController.getAll)
router.get('/params/', tableController.getTablesFilter)
router.post('/', tableController.createTable)
router.get('/:id', tableController.getOne)
router.put('/:id', tableController.updateTable)
router.delete('/:id', tableController.removeTable)

module.exports = router
