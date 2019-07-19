import mongoose from 'mongoose'

 
const Schema = mongoose.Schema
const DownloadSchema = new Schema({
    Firstname: {
        type: String,
        required: 'Firstname is required'
    },
    
    Lastname: {
        type: String,
        required: 'Lastname is required'
    },
    Email: {
        type: String,
        unique: true,        
        required: 'Email is required',
        // match:/^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$/,
    },
    
    Password: {
        type: String,
        required: 'Password is required',
    },
    ConfirmPassword: {
        type: String,
        required: 'Password does not match',

    },
    Create_At:{
        type:Date,
        default:Date.now
    },
    Updated_At:{
        type:Date,
        default:Date.now
    },
})
 
export default DownloadSchema;