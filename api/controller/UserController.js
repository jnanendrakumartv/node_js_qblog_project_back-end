var mongoose = require('mongoose'),
UserData = mongoose.model('UserInfo');
authordet=mongoose.model('details');
// authordet=mongoose.model('deatils');
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
var nodemailer = require ('nodemailer');
var fs = require("fs");

exports.getAllUsers = function(req, res) {
 
  console.log(req.body);
  UserData.find({}, function(err, details) {
    if (err)
      res.send(err);
    res.json(details);
    // console.log(data);
  });
};
// To create new user

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


exports.userSignup = function(req, res){
  // console.log('hi')
  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;;
 
  const reg_pwd=/^[@#*&_%$!][A-Za-z0-9]{6,13}$/;
  if(!reg_pwd.test(req.body.password)){
    res.send('password is invalid');
  }
  
  if(reg_email.test(req.body.email)){
    // console.log("hii");
    UserData.find({email: req.body.email},function(err, data){
      if(data != null && data != ''){
        res.send('User already exists');
      }
      else
      {
        var userData = new UserData(req.body);
        // bcrypt.genSalt(10, function(err, salt){
          // bcrypt.hash(userData.password, salt, function(err, hash) {
            // userData.password = hash;
            userData.save(function(err, data){
              if(err)
                res.send(err.message);
              res.json(data);
            })
          // })
        // })
      }
    });
  }
  else {
    res.send('Email is invalid');
  }
};

exports.userSignin = function(req,res){
  console.log('signin')
  UserData.find({email: req.body.email}, function(err, data){
    if(data != null && data != ''){
      // bcrypt.compare(req.body.password, data[0].password, function( err, isMatch) {
      //   if(isMatch == true){
          // res.json(data);
        UserData.find({password: req.body.password}, function(err, data){
          if(data != null && data != ''){
          res.send("User succesfully signIn");
          }
          else
          res.send("password incorrect");
        })
        // }
      // });
    } 
    else{
      // res.send(err);
      res.send("User does not exists");
    }
  });
};

exports.updateUser = function(req, res) {
  UserData.findOneAndUpdate({_id: req.body.userId}, 
    req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    })
}


exports.authorDetails = function(req,res){
  console.log(req.body);
  var adetails = new authordet(req.body);
  adetails.save(function(err, data){
    if(err)
      res.send(err.message);
     res.json(data);  
  })  
};


// get all details
exports.list_all_tasks = function(req, res) {
  authordet.find({}, function(err, data) {
  if (err)
  res.send(err);
  res.json(data);
  });
  };
  
  // get details by using Id
  exports.read_a_task = function(req, res) {
    authordet.findById(req.params.taskId, function(err, task) {
    if (err)
    res.send(err);
    res.json(task);
    });
    };