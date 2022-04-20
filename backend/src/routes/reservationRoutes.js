const express = require('express')
const reservationController = require('../controllers/reservationController')

const router = express.Router()

router.get('/', reservationController.getAll)
router.get('/:id', reservationController.getOne)
router.get('/params/', reservationController.getReservationsFilter)
router.post('/', reservationController.createReservation)
router.delete('/:id', reservationController.removeReservation)

module.exports = router
