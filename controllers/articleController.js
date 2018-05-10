
const mongoose = require('mongoose'),
      qs = require('querystring'),
      Article = require('../models/article'), 
      _response = require('../utils/responser');


class ArticleController {

    static _findArticles(res, options = {}, skip = 0, limit = 10 ) {
        Article.find(options, (err, docs)=> {
            if (err) return _response(res, 500, "Hubo un error al momento de buscar registros en la base de datos", err);
            if (docs.length == 0) return _response(res, 404, "No se encontro ningún registro en la base de datos");
            _response(res, 200, "La solicitud fue procesada exitosamente", docs);
        }).limit(limit)
          .skip(skip);
    }

    index(req, res) {

        if(req.url.includes('?')){
            let url = req.url.split("?")[1];
            let params = qs.parse(url);

            if( params.id == undefined && params.title == undefined && params.paginate == undefined) {
                _response(res, 404, "El parametro de la URL no es entedible por el API");
            }else{
                let option;
                if(params.id || params.title){
                    if(params.id) option = {id: params.id};
                    if(params.title) option = {title: params.title}
                    ArticleController._findArticles(res, option);
                }else if(params.paginate){
                    ArticleController._findArticles(res, {}, parseInt(params.paginate))
                } 
            }
        }else{
            ArticleController._findArticles(res);
        }
    } 
    show(req, res) {
        let id = req.params.id;
        console.log(id)
        ArticleController._findArticles(res, {id: id}, 0, 1);
    }
    create(req, res) {

    }
    update(req, res) {

    }
    delete(req, res) {
        
    }
}

module.exports = new ArticleController();