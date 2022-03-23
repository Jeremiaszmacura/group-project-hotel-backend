const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.removeUser)

module.exports = router
