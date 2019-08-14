module.exports = function(app) {
	var userData = require('../controller/UserController');
	var authordet=require('../controller/UserController');
	var incr=require('../controller/UserController');
	// var comn=require('../controller/UserController');
	var isAuth = require('../Middleware/isAuth')

 // Signup 
 app.route('/signup')
	.post(userData.userSignup)
	.get(userData.getAllUsers)

 app.route('/signin',isAuth)
	 .post(userData.userSignin)
	 .get(userData.getAllSignin)
	 .get(userData.list_all_tasks)
	 app.route('/signin/:taskId')
	 .get(userData.read_a_task1)

//  .get(userData.getAllUsers);
 app.route('/getUser/:emailId')
 .get(userData.getUser)

 //To update user date 
 app.route('/updateUser')
 .put(userData.updateUser)

// Insert author and books details
 app.route('/details')
 .post(authordet.authorDetails)
 .post(authordet.bookcomments)

 // To get detail by using Id
 .get(authordet.list_all_tasks)
 app.route('/details/:taskId')
 .get(authordet.read_a_task)

 // To increment likes
 app.route('/like')
 .post(incr.increment)


//comments get
.get(incr.list_all_tasks1)
app.route('/like/:taskId1')
.get(incr.read_a_task1)


 //comments
//  app.route('/write')
//  .post(comn.comme)



// Comments 
//  app.route('/details')
//  .post(authordet.bookcomments)

 // To get detail by using Id
//  .get(authordet.list_all_tasks)
//  app.route('/details1/:taskId')
//  .get(authordet.read_a_task)

};