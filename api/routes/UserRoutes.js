module.exports = function(app) {
	var userData = require('../controller/UserController');
	var authordet=require('../controller/UserController');


 // To add or create user
 app.route('/signup')
 .post(userData.createUser);

 //to get user detail using email Id
//  app.route('/getAllUsers')
//  .get(userData.getAllUsers);

app.route('/getAllUsers')
.get(userData.getAllUsers);

 app.route('/getUser/:emailId')
 .get(userData.getUser);

 //To update user date 
 app.route('/updateUser')
 .put(userData.updateUser);



 //To sign steps
 app.route('/signin')
 .post(userData.userSignin);


// Insert author and books details
 app.route('/details')
 .post(authordet.authorDetails)

 .get(authordet.list_all_tasks)
 app.route('/details/:taskId')
 .get(authordet.read_a_task)
 

 
// app.route('/getAllUserss')
// .get(authordet.getAllUserss);

// // to get books details by using email Id
// app.route('/getUsers/:mailId')
// .get(authordet.getUsers);

};
