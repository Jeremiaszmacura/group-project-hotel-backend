const express = require('express')
const bookingController = require('../controllers/bookingController')
const { checkIsInRole, isLoggedIn } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', checkIsInRole('CLERK', 'ADMIN'), bookingController.getAll)
router.post('/', isLoggedIn, bookingController.createBooking)
router.get('/user/', isLoggedIn, bookingController.getUserAll)
router.get('/:id', bookingController.getOne)
router.delete('/:id', isLoggedIn, bookingController.removeBooking)

module.exports = router
