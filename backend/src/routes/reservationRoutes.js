const express = require('express')
const reservationController = require('../controllers/reservationController')

const router = express.Router()

router.get('/', reservationController.getAll)
router.get('/:id', reservationController.getOne)
router.get('/search/', reservationController.getReservationsFilter)
router.post('/', reservationController.createReservation)
router.put('/:id', reservationController.updateReservation)
router.delete('/:id', reservationController.removeReservation)

module.exports = router
