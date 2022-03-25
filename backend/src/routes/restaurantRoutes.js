const express = require('express')
const restaurantController = require('../controllers/restaurantController')

const router = express.Router()

router.get('/:id/menu/', restaurantController.getMenu)
router.get('/:id/dish/:id', restaurantController.getDish)
router.post('/:id/dish/', restaurantController.createDish)
router.post('/', restaurantController.createRestaurant)
router.patch('/:id', restaurantController.updateRestaurant)
router.put('/:id/dish/:id', restaurantController.updateDish)
router.delete('/:id/dish/:id', restaurantController.removeDish)
router.delete('/:id', restaurantController.removeRestaurant)

module.exports = router
