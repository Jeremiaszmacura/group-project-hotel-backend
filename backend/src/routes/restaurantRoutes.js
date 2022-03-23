const express = require('express')
const restaurantController = require('../controllers/restaurantController')

const router = express.Router()

router.get('/menu/', restaurantController.getMenu)
router.get('/dish/:id', restaurantController.getDish)
router.get('/openHours/', restaurantController.getOpenHours)
router.post('/dish/', restaurantController.createDish)
router.post('/', restaurantController.createRestaurant)
router.patch('/', restaurantController.updateRestaurant)
router.put('/dish/:id', restaurantController.updateDish)
router.delete('/dish/:id', restaurantController.removeDish)
router.delete('/', restaurantController.removeRestaurant) // zmienić w README.md id restaurant wszędzie albo nigdzie

module.exports = router
