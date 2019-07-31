var mongoose = require('mongoose'),
UserData = mongoose.model('UserInfo');
authordet=mongoose.model('details');
// authordet=mongoose.model('deatils');
var bcrypt = require('bcryptjs');
var fs = require("fs");


// To create new user

exports.list_all_tasks = function(req, res) {
  authordet.find({}, function(err, data) {
  if (err)
  res.send(err);
  res.json(data);
  });
  };
  
  exports.read_a_task = function(req, res) {
    authordet.findById(req.params.taskId, function(err, task) {
    if (err)
    res.send(err);
    res.json(task);
    });
    };




exports.createUser = function(req, res){
  const remail=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  const rpwd=/^[@#*&_%$!][A-Za-z0-9]{6,13}$/;
if(!rpwd.test(req.body.password)){
res.send('password should contain !,@,#,$,%,&,*, Charecter and numbers');
}
if(remail.test(req.body.email)){
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


exports.authorDetails = function(req,res){
  console.log(req.body);
  var adetails = new authordet(req.body);
  adetails.save(function(err, data){
    if(err)
      res.send(err.message);
     res.json(data);  
  })  
};



// exports.getAllUserss = function(req, res) {
//   debugger
//   console.log(req.body);
//   authordet.find({}, function(err, data) {
//     if (err)
//       res.send(err);
//     res.json(data);
//     console.log(data);
//   });
// };

// exports.getUsers = function(req, res){
//   console.log(req.params.emailId);    
//   authordet.find({email: req.params.emailId},
//     function(err, data){
//       if (err)
//         res.send(err);
//       res.json(data);
//       // res.json('user created sucessfully');
//     });
// };