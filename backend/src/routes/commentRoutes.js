const express = require('express')
const commentController = require('../controllers/commentController')

const router = express.Router()

router.get('/', commentController.getAll)
router.post('/', commentController.createComment)
router.put('/:id', commentController.updateComment)
router.delete('/:id', commentController.removeComment)

module.exports = router
