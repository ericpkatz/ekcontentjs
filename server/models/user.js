var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true, unique: true},
  firstName: { type: String },
  lastName: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
