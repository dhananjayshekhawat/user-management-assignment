const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    dob: { type: Date, required: true },
    city: { type: String, required: true },
    mobileNumber: { type: Number, required: true, length: 10 }
})

const User = mongoose.model('User', userSchema)
module.exports = User