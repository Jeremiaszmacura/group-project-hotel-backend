const express = require('express')
const userController = require('../controllers/userController')
const { checkIsInRole, isLoggedIn } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.put('/:id/validate', isLoggedIn, checkIsInRole('ADMIN'), userController.validateUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.removeUser)

module.exports = router
