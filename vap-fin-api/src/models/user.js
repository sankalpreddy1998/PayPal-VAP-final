const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address:{
        type: String,
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    pincode:{
        type: Number,
    },
})

const userSchema = new Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
    },
    phone_no:{
        type: Number,
    },
    role:{
        type: String,
        enum: ["admin","vendor","customer","shipper"]
    },
    address:[addressSchema]
})

const User = mongoose.model('user',userSchema);

module.exports = User;