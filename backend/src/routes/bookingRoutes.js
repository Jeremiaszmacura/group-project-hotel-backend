const express = require('express')
const bookingController = require('../controllers/bookingController')
const { isLoggedIn } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', bookingController.getAll)
router.get('/user/', isLoggedIn, bookingController.getUserAll)
router.get('/:id', bookingController.getOne)
router.get('/search/', bookingController.getBookingsFilter)
router.post('/', isLoggedIn, bookingController.createBooking)
router.put('/:id', bookingController.updateBooking)
router.delete('/:id', bookingController.removeBooking)

module.exports = router
