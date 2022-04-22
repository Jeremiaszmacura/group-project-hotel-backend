const express = require('express')
const tableController = require('../controllers/tableController')
const { checkIsInRole, isLoggedIn } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', tableController.getAll)
router.get('/params/', tableController.getTablesFilter)
router.post('/', isLoggedIn, checkIsInRole('CLERK', 'ADMIN'), tableController.createTable)
router.get('/:id', tableController.getOne)
router.put('/:id', isLoggedIn, checkIsInRole('CLERK', 'ADMIN'), tableController.updateTable)
router.delete('/:id', isLoggedIn, checkIsInRole('CLERK', 'ADMIN'), tableController.removeTable)

module.exports = router
