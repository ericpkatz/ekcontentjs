var router = require('express').Router();
var passport = require('passport');
var env = require('../env');

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

router.get('/google', passport.authenticate('google', { scope: 'email' }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect(env.value("GOOGLE_SUCCESS_REDIRECT"));
  });

module.exports = router;
