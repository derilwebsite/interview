const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
})

const User = mongoose.model('user',UserSchema)

module.exports = User