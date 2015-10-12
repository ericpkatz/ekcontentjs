var router = require('express').Router();
var path = require('path');

module.exports = router;

var staticDir = path.join(__dirname, '../', '../', 'public');
router.use(require('express').static( staticDir ));
