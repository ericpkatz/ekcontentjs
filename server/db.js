var Promise = require('bluebird');
var mongoose = require('mongoose');

module.exports = {
  connect: connect,
  disconnect: disconnect
};

var conn = process.env.CONN || 'mongodb://localhost/ekcontentjs';

function connect(){
  return new Promise(function(resolve, reject){
    mongoose.connect(conn, function(err){
      if(!err)
        return resolve(mongoose.connection);
      reject(err);
    });
  });
}

function disconnect(){
  return new Promise(function(resolve, reject){
    mongoose.disconnect(function(err){
      if(!err)
        return resolve(mongoose.connection);
      reject(err);
    });
  });

}
