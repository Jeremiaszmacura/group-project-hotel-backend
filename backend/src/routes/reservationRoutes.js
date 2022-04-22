const express = require('express')
const reservationController = require('../controllers/reservationController')
const { isLoggedIn } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', reservationController.getAll)
router.get('/:id', reservationController.getOne)
router.get('/params/', reservationController.getReservationsFilter)
router.post('/', isLoggedIn, reservationController.createReservation)
router.delete('/:id', isLoggedIn, reservationController.removeReservation)

module.exports = router
