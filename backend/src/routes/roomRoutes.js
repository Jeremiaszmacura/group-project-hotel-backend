const express = require('express')
const roomController = require('../controllers/roomController')

const router = express.Router()

router.get('/', roomController.getAll)
router.get('/:id', roomController.getOne)
router.get('/search/', roomController.getRoomsFilter)
router.get('/category/', roomController.getCategories)
router.post('/category/', roomController.createCategory)
router.post('/', roomController.createRoom)
router.patch('/category/:id', roomController.updateCategory)
router.put('/:id', roomController.updateRoom)
router.delete('/category/:id', roomController.removeCategory)
// Zmienić kolejność w README.md

module.exports = router
