module.exports = function(app) {
	var userData = require('../controller/UserController');
	var authordet=require('../controller/UserController');


 // To add or create user
 app.route('/signup')
 .post(userData.createUser);

 //to get user detail using email Id
//  app.route('/getAllUsers')
//  .get(userData.getAllUsers);



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

 app.route('/details')
 .post(authordet.authorDetails);




};
