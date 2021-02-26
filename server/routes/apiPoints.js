router = require('express-promise-router')()

const apiController = require('../controllers/apiPoint')

router.route('/search/:query')
.get(apiController.complexSearch)

router.route('/id/:id')
.get(apiController.recipieID)

module.exports = router