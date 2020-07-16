const router = require('express').Router()
const MoviesController = require('../controllers/MoviesController')

router.get('/', MoviesController.find)

router.get('/:id', MoviesController.findOne)

router.post('/', MoviesController.create)

router.put('/:id', MoviesController.update)

router.delete('/:id', MoviesController.delete)

module.exports = router