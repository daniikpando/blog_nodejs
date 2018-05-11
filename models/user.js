
const mongoose = require("mongoose"),
      bcrypt = require('bcrypt-nodejs');

let User= new mongoose.Schema({
    id: {type: Number, required: true, unique: true}, 
    username: {type: String, required: true, unique: true}, 
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {
    timestamps: true
});

User.pre('save', (next) => {
    let usuario = this;

    if(!usuario.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if(err) return next(err);

            usuario.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('user', User);