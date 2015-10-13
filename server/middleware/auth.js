var router = require('express').Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../models/index').User;
var env = require('../env');


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
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }
));

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: env.value('GOOGLE_CLIENT_ID'),
      clientSecret: env.value('GOOGLE_CLIENT_SECRET'),
      callbackURL: env.value('GOOGLE_CALLBACK_URL') 
    },
    function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id })
        .then(function (user) {
          return done(null, user);
        });
    }
  )
);




router.use(passport.initialize());
router.use(passport.session());

module.exports = router;
