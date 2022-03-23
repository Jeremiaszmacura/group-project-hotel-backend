const express = require('express')
const tableController = require('../controllers/tableController')

const router = express.Router()

router.get('/', tableController.getAll)
router.get('/:id', tableController.getOne)
router.get('/search/', tableController.getTablesFilter)
router.post('/', tableController.createTable)
router.put('/:id', tableController.updateTable)
router.delete('/:id', tableController.removeTable)

module.exports = router
