var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstname: {
    type: String,
    required: 'Please Enter the firstname'
  },
  lastname: {
    type: String,
    required: 'Please Enter the lastname'
  },
  email: {
    type: String,
    required: 'Please Enter valid emailId'
  },
  password: {
    type: String,
    required: 'Please Enter the current password'
  },
  // confirm_pass: {
  //   type: String,
  //   required: 'Please Enter confirm password'
  // }, 
 
});

module.exports = mongoose.model('UserInfo', UserSchema);


var UserSchema1 =new Schema({
  author:{ type:String },
  books:{ type:String },
  price : { type: String},
  edition: { type: String},
  published:{ type: String},
  
})
module.exports = mongoose.model('details', UserSchema1);
