router = require('express-promise-router')()

const apiController = require('../controllers/apiPoint')



router.route('/search')
.get(apiController.complexSearch)

router.route('/searchbyIngredients')
.get(apiController.getrecipebyIngredients)


module.exports = router