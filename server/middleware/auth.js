var router = require('express').Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../models/index').User;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  function(email, password, done) {
    console.log('hello');
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }
));

router.use(passport.initialize());
router.use(passport.session());

module.exports = router;
