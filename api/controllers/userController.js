import mongoose from 'mongoose'
import downloadSchema from '../models/userModel'


const Download = mongoose.model('Download', downloadSchema)
const bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
exports.add_Data = (req, res) => {
    
    if(req.body.Password === req.body.ConfirmPassword){
        req.body.Password = cryptr.encrypt(req.body.Password);
        req.body.ConfirmPassword = cryptr.encrypt(req.body.ConfirmPassword);
        }
    let newDownload = new Download(req.body)
    newDownload.save((error, download) => {
        if (error) { res.json(error) }
        res.json("User created successfully")
    })
}  
exports.get_Data = (req, res) => {
    Download.find({}, (error, downloads) => {
        if (error) { res.json(error) }
        res.json(downloads)
    })
}
exports.update_Data = (req, res) => {
        Download.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, download) => {
            if (error) { res.json(error) }
            res.json(download)
        })
    }
    exports.delete_Data = (req, res) => {
        Download.remove((error, download) => {
            if (error) { res.json(error) }
            res.json(download)
        })
    }
    
           
    


