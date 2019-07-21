module.exports = function(app) {
	var userData = require('../controller/UserController');

// User signup 
 app.route('/signup')
 .post(userData.userSignup);

 // To add or create user
 app.route('/createUser')
 .post(userData.createUser);

 

 //to get user detail using email Id
 app.route('/getUser/:emailId')
 .get(userData.getUser);

 //To update user date 
 app.route('/updateUser')
 .put(userData.updateUser);

//  //To delete user data by using userId
//  app.route('/deleteUser/:userId')
//  .delete(userData.deleteUser);

 //To sign steps
 app.route('/signin')
 .post(userData.userSignin);
 
};