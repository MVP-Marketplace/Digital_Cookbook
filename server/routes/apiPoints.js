router = require('express-promise-router')()

const apiController = require('../controllers/apiPoint')

router.route('/search/:search')
.get(apiController.complexSearch)

router.route('/id/:id')
.get(apiController.recipieID)

router.route('/random')
.get(apiController.randomRecipes)

router.route('/three')
.get(apiController.randomRecipesThree)

module.exports = router