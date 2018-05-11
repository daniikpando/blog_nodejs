const User = require("../models/user"),
       _response = require("../utils/responser");

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
        let email = req.body.email; 

        let isEmail = UserController.validarEmail(email);

        if(!isEmail) {
            return _response(res,400, "El email es incorrecto");
        }
        _response(res,200, "dede",{
            message: "Registrarse"
        });
    }

    static validarEmail(value) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)
    }
}


module.exports = new UserController();