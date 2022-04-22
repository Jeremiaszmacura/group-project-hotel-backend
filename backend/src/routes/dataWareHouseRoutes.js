const express = require('express')
const DataWareHouseController = require('../controllers/dataWareHouseController')
const { checkIsInRole, isLoggedIn } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', isLoggedIn, checkIsInRole('ADMIN'), DataWareHouseController.listIndicators)
router.post('/', isLoggedIn, checkIsInRole('ADMIN'), DataWareHouseController.setRebuildPeriod)
router.get('/latest', isLoggedIn, checkIsInRole('ADMIN'), DataWareHouseController.lastIndicator)

module.exports = router
