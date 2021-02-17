router = require('express-promise-router')()

const apiController = require('../controllers/apiPoint')

router.route('/search')
.get(apiController.complexSearch)


module.exports = router