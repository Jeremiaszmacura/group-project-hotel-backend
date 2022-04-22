const express = require('express')
const roomController = require('../controllers/roomController')

const router = express.Router()

router.get('/', roomController.getAll) // get all categories (and nested things)
router.get('/rooms/params/', roomController.getRoomsFilter)
router.get('/rooms/', roomController.getRooms)
router.post('/', roomController.createCategory)
router.post('/rooms/', roomController.createRoom)
router.patch('/:id', roomController.updateCategory)
router.get('/:id', roomController.getOne)
router.get('/rooms/:id', roomController.getOneRoom)
router.put('/rooms/:id', roomController.updateRoom)
router.delete('/:id', roomController.removeCategory)
router.delete('/rooms/:id', roomController.removeRoom)

module.exports = router
