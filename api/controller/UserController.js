var mongoose = require('mongoose'),
UserData = mongoose.model('UserInfo');
var bcrypt = require('bcryptjs');
var fs = require("fs");


// To create new user

exports.createUser = function(req, res){
  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  const reg_pwd=/^[@#*&_%$!][A-Za-z0-9]{6,13}$/;
if(!reg_pwd.test(req.body.password)){
res.send('password is invalid');
}
if(reg_email.test(req.body.email)){
  console.log("welcome");
  console.log(req.body);
  UserData.find({email: req.body.email},function(err, data){
    if(data != null && data != ''){
      res.send('Entered User data already exists');
    }
    else
    {
      var userData = new UserData(req.body);
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(userData.password, salt, function(err, hash) {
          userData.password = hash;
          userData.save(function(err, data){
            if(err)
              res.send(err.message);
            //  res.json(data);
            res.json('user created sucessfully');
            
          })
        })
      })
    }
  });
}
else {
res.send('Entered Email is invalid');
}
};

exports.userSignin = function(req,res){
  UserData.find({email: req.body.email}, function(err, data){
    if(data != null && data != ''){
      bcrypt.compare(req.body.password, data[0].password, function( err, isMatch) {
        if(isMatch == true){
          res.send("succesfully Sign in");
        }
      });
    } else{
      res.send("you entred User does not exists");
    }
  });
};



//get all users
exports.getAllUsers = function(req, res) {
 
  console.log(req.body);
  UserData.find({}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
    console.log(data);
  });
};
exports.getUser = function(req, res){

  console.log(req.params.emailId);    
  UserData.find({email: req.params.emailId},
    function(err, data){
      if (err)
        res.send(err);
      res.json(data);
      console.log(data);
    });
};


exports.updateUser = function(req, res) {
  UserData.findOneAndUpdate({_id: req.body.userId}, 
    req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

// exports.deleteUser = function(req, res){
//   UserData.remove({
//     _id: req.params.userId
//   }, function(err, data) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'user successfully deleted' });
//   })
// };

// // Delete users
// app.route('/getAllUsers')
// .get(userData.getAllUsers);