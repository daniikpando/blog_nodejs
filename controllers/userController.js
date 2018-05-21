const User = require("../models/user"),
       _response = require("../utils/responser"), 
       bcrypt = require("bcrypt-nodejs");

class UserController {

    static _findUser(res,obj){
        User.findOne(obj, (err, docs) => {
            console.log(docs);
            if(err) return _response(res, 500, "Hubo un error al iniciar seccion", err);
            if(docs == null) return _response(res, 404, `El email o la contraseña son incorrectos, intenta nuevamente`)
            _response(res, 200, "Se ha logeado", docs);
        })
    }

    signin(req, res) {
        let data = req.body.data;
        let password = req.body.password;

        console.log(req.body)
        if(data == undefined && password == undefined){
            return _response(res,400, "El email o la contraseña no fueron enviados");
        }
        if(data.includes("@")){ 
            return UserController._findUser(res, {email: data, password: password});    
        }
        UserController._findUser(res, {username: data, password: password})
    }
    signup(req, res) {
        let user = new User({
            password_confirmation: req.body.password_confirmation,
            id: req.body.id,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        const promise = UserController.encryptPass(user);
        promise
            .then( (obj) => {
                console.log("p1: " + obj.password);
                console.log("p2: " + obj.password_confirmation);
                obj.save((err, doc) => {
                    if(err) return _response(res,500, "El usuario no se pudo registrar", err);
                    _response(res,200, "Usuario registrado exitosamente", doc);
                });
             })
            .catch( (err) => {
                if(err) return _response(res, 500, "El usuario no se pudo registrar", err);
            });
    }
    static async encryptPass(obj) {
        let key; 
        bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;
            key = salt;
        });

        bcrypt.hash(obj.password, key, null, (err, hash) => {
            if(err) throw err;
            obj.password = String(hash);
        });
        return obj;
    }
}


module.exports = new UserController();