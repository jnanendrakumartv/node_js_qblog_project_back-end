var mongoose = require('mongoose'),
UserData = mongoose.model('UserInfo');
authordet=mongoose.model('details');
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
var nodemailer = require ('nodemailer');
var isAuth=require('../Middleware/isAuth');
var fs = require("fs");


//get all users
exports.getAllUsers = function(req, res) {
  console.log(req.body);
  UserData.find({}, function(err, details) {
    if (err)
      res.send(err);
    res.json(details);
    // console.log(data);
  });
};


exports.userSignup = function(req, res){
  console.log('hi')
  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
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
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(userData.password, salt, function(err, hash) {
            userData.password = hash;
            userData.save(function(err, data){
              if(err)
                res.send(err.message);
              res.json(data);
            })
          })
        })
      }
    });
  }
  else {
    res.send('Email is invalid');
  }
};

// exports.userSignin = function(req,res){
//   console.log('signin')
//   UserData.find({email: req.body.email}, function(err, data){
//     if(data != null && data != ''){
//       // bcrypt.compare(req.body.password, data[0].password, function( err, isMatch) {
//       //   if(isMatch == true){
//           // res.json(data);
//         UserData.find({password: req.body.password}, function(err, data){
//           if(data != null && data != ''){
//           res.send("User succesfully signIn");
//           }
//           else
//           res.send("password incorrect");
//         })
//         // }
//       // });
//     } 
//     else{
//       // res.send(err);
//       res.send("User does not exists");
//     }
//   });
// };

// exports.userSignin = (req,res,next) =>{
//   const email = req.body.email;
//   const password = req.body.password;
//   let loadedUser;
//   UserData.findOne({email: email})
//   .then(user =>{
//     if(!user){
//       const error = new Error('A user with this email could not be found.');
//       error.statusCode = 401;
//       throw error;
//     }
//     loadedUser = user;
//     return bcrypt.compare(password,user.password);
//   })
//   .then(isEqual =>{
//     if(!isEqual){
//       const error = new Error('wrong password.');
//       error.statusCode = 401;
//       throw error;
//     }
//     const token = jwt.sign(
//     {
//       email: loadedUser.email,
//       userId:loadedUser._id.toString()
//     },'secret',)
//     res.status(200).json({token: token, userId: loadedUser._id.toString()})
//     res.json({
//       success: true,
//       token: token
//   });
//   })
//   .catch(err => {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }); 
// }


exports.userSignin = (req,res,next) =>{
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({email: email})
  .then(user =>{
    if(!user){
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId:loadedUser._id.toString()
      },'secret')
      return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email})
      // res.json({
        // success: true,
        // token: token
    // });
    // })
    // return bcrypt.compare(password,user.password);
  })
  // .then(isEqual =>{
    // if(!isEqual){
    //   const error = new Error('wrong password.');
    //   error.statusCode = 401;
    //   throw error;
    // }

  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }); 
}






exports.getAllSignin = (isAuth,function(req, res) {
  UserData.find({userId:req.decodedToken}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data); 
  });
});


exports.read_a_task1 = function(req, res) {
  UserData.findById(req.params.taskId, function(err, task) {
  if (err)
  res.send(err);
  res.json(task);
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



// add author and book details
exports.authorDetails = function(req,res){
  console.log(req.body);
  var adetails = new authordet(req.body);
  adetails.save(function(err, data){
    if(err)
      res.send(err.message);
     res.send(data); 
     console.log(data); 

  })  
};

// add comments
// exports.bookcomments = function(req,res){
//   console.log(req.body);
//   var bookdetails = new authordet(req.body);
//   bookdetails.save(function(err, data){
//     if(err)
//       res.send(err.message);
//      res.send(data); 
//      console.log(data); 

//   })  
// };

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



    // exports.authorDetails = function(req, res){
    //   console.log('hi')
    //   const reg_book=/^[A-Za-z0-9]{2,10}$/;
    //   const reg_price=/^[A-Za-z0-9]{2,10}$/;
    //   let reg_user=/^[A-Za-z]{2,10}$/;
    //   if(!reg_price.test(req.body.password)){
    //     res.send('password is invalid');
    //   }
      
    //   if(reg_book.test(req.body.email)){
    //     // console.log("hii");
    //     authordet.find({book: req.body.book},function(err, data){
    //       if(data != null && data != ''){
    //         res.send('User already exists');
    //       }
    //       else
    //       {
    //         var authordet = new UserData(req.body);
    //         bcrypt.genSalt(10, function(err, salt){
    //           bcrypt.hash(authordet.price, salt, function(err, hash) {
    //             authordet.password = hash;
    //             authordet.save(function(err, data){
    //               if(err)
    //                 res.send(err.message);
    //               res.json(data);
    //             })
    //           })
    //         })
    //       }
    //     });
    //   }
    //   else {
    //     res.send('Email is invalid');
    //   }
    // };
    