const express = require('express')
const bookingController = require('../controllers/bookingController')

const router = express.Router()

router.get('/', bookingController.getAll)
router.get('/:id', bookingController.getOne)
router.get('/search/', bookingController.getBookingsFilter)
router.post('/', bookingController.createBooking)
router.put('/:id', bookingController.updateBooking)
router.delete('/:id', bookingController.removeBooking)

module.exports = router
