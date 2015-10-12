var express = require('express');
var chalk = require('chalk');
var db = require('./server/db');
var User = require('./server/models').User;


db.connect()
  .then(function(conn){
    console.log(chalk.green('Connected to db ' + conn.name));
    return conn;
  })
  .then(function(conn){
    //TODO setup mongo session
  })
  .catch(function(err){
    console.log(chalk.red(err));
  })

var app = express();

app.use(require('./server/middleware/static'));
app.use(require('./server/middleware/request'));
app.use(require('./server/middleware/session'));

app.use(function(req, res, next){
  if(!req.session.userId)
    return next();
  User.findOne(req.session.userId)
    .exec(function(err, user){
      if(err)
        return res.redirect('/');
      res.locals.user = user;
      next();
    });
});

function ensureUser(req, res, next){
  if(!res.locals.user)
    return res.redirect('/');
  next();
}



app.set('view engine', 'jade');

app.get('/', function(req, res, next){
  res.render('index');
});

app.get('/profile', ensureUser, function(req, res, next){
  res.render('profile');
});

app.post('/profile', ensureUser, function(req, res, next){
  res.locals.user.firstName = req.body.first_name;
  res.locals.user.lastName = req.body.last_name;
  res.locals.user.save(function(err, user){
    res.render('profile', { error: err, message: (err ? null : 'Saved') } );
  });
});

app.get('/login', function(req, res, next){
  res.render('login');
});

app.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});


app.post('/login', function(req, res, next){
  User.findOne(req.body)
    .then(function(user){
      if(!user)
        return res.render('login', { error: 'bad login' });
      req.session.userId = user._id;
      res.redirect('/profile');
    });
});


var port = process.env.PORT || 3000;

app.listen(port, function(err){
  console.log(chalk.green('happily listening on port ' + port));
});

process.on('uncaughtException', function(err){
  if(err.errno == 'EADDRINUSE')
    console.log(chalk.red(err), chalk.red(port));
  else
    console.log(chalk.red(err));
  process.exit(1);
});

