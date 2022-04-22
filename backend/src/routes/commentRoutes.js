const express = require('express')
const commentController = require('../controllers/commentController')
const { checkIsInRole, isLoggedIn } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', commentController.getAll)
router.post('/', isLoggedIn, commentController.createComment)
router.put('/:id', isLoggedIn, checkIsInRole('ADMIN'), commentController.updateComment)
router.delete('/:id', isLoggedIn, checkIsInRole('ADMIN'), commentController.removeComment)

module.exports = router
