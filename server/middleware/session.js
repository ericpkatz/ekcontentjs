var router = require('express').Router();

var secret = process.env.SECRET || 'ekcontent';

var conn = process.env.CONN || 'mongodb://localhost/ekcontentjs';

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
 
router.use(session({
    secret: 'foo',
    store: new MongoStore({
      url: conn 
    })
}));

module.exports = router;
