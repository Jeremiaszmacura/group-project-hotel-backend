const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/', userController.getAll)

router.post('/signup', userController.createUser)

module.exports = router
