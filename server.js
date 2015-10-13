var express = require('express');
var chalk = require('chalk');
var db = require('./server/db');
var User = require('./server/models').User;
var passport = require('passport');
var env = require('./server/env');


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
app.use(require('./server/middleware/auth'));

app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

app.set('view engine', 'jade');

app.get('/', function(req, res, next){
  res.render('index');
});


app.use(require('./server/routes/'));



var port = env.value('PORT');

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
