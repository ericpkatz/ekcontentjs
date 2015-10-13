var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');

module.exports = {
  value: value
};

var _filePath = path.join(__dirname, '../', '.env');

var _envData = {};

try {
_envData = JSON.parse(fs.readFileSync(_filePath).toString());
}
catch(e) {
}


function value(key){
  var data = process.env[key] || _envData[key];
  return data;
}


