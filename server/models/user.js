var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  email: { type: String},
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  googleId: { type: String }
});

UserSchema.statics.findOrCreate = function(attr, profile){
  var that = this;
  return this.findOne(attr)
    .then(function(user){
      if(user)
        return user
      attr.email = Math.random() + '@gmail.com';
      attr.password = Math.random().toString();
      console.log(attr);
      return that.create(attr);
    })
    .then(function(user){
      return user;
    });
}

module.exports = mongoose.model('User', UserSchema);
