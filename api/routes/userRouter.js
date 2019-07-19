import { add_Data,get_Data,update_Data,delete_Data,login_Data} from '../controllers/userController'
const { check,validationResult } = require('express-validator/check')


const routes = (app) => {
    app.route('/getting')
    .get(get_Data)
    .delete(delete_Data)
        app.post('/signin',
           
            [
              check('Firstname').not().isEmpty().trim(),
              check('Lasttname').not().isEmpty().trim().withMessage('Lastname is required'),
              check('Email').not().isEmpty().trim().withMessage('Email is requierd'),
              check('Password').isLength({ max : 8 }).withMessage('Password must have more than 5 characters'),
              check('ConfirmPassword').not().isEmpty().trim().withMessage('Password does not match')

            ],add_Data,(req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
                }
                User.create({
                Firstname:req.body.Firstname,
                Lastname:req.body.Lastname,
                Email: req.body.Email,
                Password: req.body.Password,
                ConfirmPassword:req.body.ConfirmPassword,
                }               
                ).then(user => res.json(user));
                });
                // app.post('/login',login_Data)
              //  app.route('/assessment/:id')
              //  .put(update_Data)
        
      
}
export default routes








