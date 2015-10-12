var router = require('express').Router();

function ensureUser(req, res, next){
  if(!res.locals.user)
    return res.redirect('/');
  next();
}


router.get('/', ensureUser, function(req, res, next){
  res.render('profile');
});

router.post('/', ensureUser, function(req, res, next){
  res.locals.user.firstName = req.body.first_name;
  res.locals.user.lastName = req.body.last_name;
  res.locals.user.save(function(err, user){
    res.render('profile', { error: err, message: (err ? null : 'Saved') } );
  });
});

module.exports = router;
