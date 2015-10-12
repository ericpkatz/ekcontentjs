var router = require('express').Router();
var passport = require('passport');

router.get('/login', function(req, res, next){
  res.render('login');
});

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});


router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

module.exports = router;
