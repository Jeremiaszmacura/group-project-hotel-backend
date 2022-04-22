const express = require('express')
const restaurantController = require('../controllers/restaurantController')
const { checkIsInRole, isLoggedIn } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', restaurantController.getRestaurants)
router.post('/', isLoggedIn, checkIsInRole('ADMIN'), restaurantController.createRestaurant)
router.get('/:id/menu/', restaurantController.getMenu)
router.post('/:id/dish/', isLoggedIn, checkIsInRole('ADMIN'), restaurantController.createDish)
router.get('/:restaurantId/dish/:dishId', restaurantController.getDish)
router.put('/:id', isLoggedIn, checkIsInRole('ADMIN'), restaurantController.updateRestaurant)
router.put('/:restaurantId/dish/:dishId', isLoggedIn, checkIsInRole('ADMIN'), restaurantController.updateDish)
router.delete('/:restaurantId/dish/:dishId', isLoggedIn, checkIsInRole('ADMIN'), restaurantController.removeDish)
router.delete('/:id', isLoggedIn, checkIsInRole('ADMIN'), restaurantController.removeRestaurant)

module.exports = router
