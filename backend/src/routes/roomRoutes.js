const express = require('express')
const roomController = require('../controllers/roomController')
const { checkIsInRole, isLoggedIn } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', roomController.getAll) // get all categories (and nested things)
router.get('/rooms/params/', roomController.getRoomsFilter)
router.get('/rooms/', roomController.getRooms)
router.post('/', isLoggedIn, checkIsInRole('ADMIN'), roomController.createCategory)
router.post('/rooms/', isLoggedIn, checkIsInRole('CLERK', 'ADMIN'), roomController.createRoom)
router.patch('/:id', isLoggedIn, checkIsInRole('ADMIN'), roomController.updateCategory)
router.get('/:id', roomController.getOne)
router.get('/rooms/:id', roomController.getOneRoom)
router.put('/rooms/:id', isLoggedIn, checkIsInRole('CLERK', 'ADMIN'), roomController.updateRoom)
router.delete('/:id', isLoggedIn, checkIsInRole('ADMIN'), roomController.removeCategory)
router.delete('/rooms/:id', isLoggedIn, checkIsInRole('CLERK', 'ADMIN'), roomController.removeRoom)

module.exports = router
