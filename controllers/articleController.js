
const mongoose = require('mongoose'),
      Article = require('../models/article');


class ArticleController {

    index(req, res) {
        Article.find((err, docs)=> {
            res.status(200).json(docs)
        });
    } 
    show(req, res) {

    }
    create(req, res) {

    }
    update(req, res) {

    }
    delete(req, res) {

    }
}

module.exports = new ArticleController();