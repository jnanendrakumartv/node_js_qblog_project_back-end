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
});
module.exports = mongoose.model('UserInfo', UserSchema);

var UserSchema1 =new Schema({
    authorname:{ type:String },
    bookname:{ type:String },
    price : { type: String},
    edition: { type: String},
    comments: { type:String}, 
})
module.exports = mongoose.model('details', UserSchema1);

var UserSchema2 =new Schema({
  count: {
    type:String,
    default:1
  }
})
module.exports = mongoose.model('like', UserSchema2);


