var router = require('express').Router();

var secret = process.env.SECRET || 'ekcontent';

router.use(require('express-session')({
  secret: secret
}));

module.exports = router;
