
const mongoose = require("mongoose"), 
      bcrypt = require("bcrypt-nodejs");


let emailValidator = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

let passwordValidation = {
    validator: (pass) => {
        let isValid = bcrypt.compareSync(this.pass_conf, pass);
        return isValid;
    }, 
    message: "The passwords are differents, please change them"
}

var User= new mongoose.Schema({
    id: {type: Number, required: true, unique: true}, 
    username: {type: String, required: "Username is missing", unique: true, minlength: [3, "username is very short"]}, 
    email: {type: String, required: "Email is missing", unique: true, match: [emailValidator, "Email isn't valid, please fix with the correct form"]},
    password: {type: String, required: "Password is missing", minlength: [6, "Password must have 8 or more characters"], validate: passwordValidation}
}, { 
    timestamps: true
});


User.pre('save', (next) => {
    console.log("Se va a guardar");
    console.log(this);
    next();
}, (err) => {
    console.log(err);
});

User.virtual('password_confirmation')
    .get(() => {
        return this.pass_conf;
    })
    .set((pass) => {
        this.pass_conf = pass;
    });

module.exports = mongoose.model('user', User);