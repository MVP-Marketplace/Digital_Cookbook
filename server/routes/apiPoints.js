router = require('express-promise-router')()

const apiController = require('../controllers/apiPoint')

router.route('/search/:query')
.get(apiController.complexSearch)


module.exports = router