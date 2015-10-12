var router = require('express').Router();

module.exports = router;

router.use(require('body-parser').urlencoded({ extended: false}));
