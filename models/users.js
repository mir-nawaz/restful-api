// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 

  return this.name;
};

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});
module.exports = restful.model('Users', userSchema);
