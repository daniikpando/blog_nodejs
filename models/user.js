
const mongoose = require("mongoose");


let User= new mongoose.Schema({
    id: {type: Number, required: true, unique: true}, 
    username: {type: String, required: true, unique: true}, 
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('user', User);