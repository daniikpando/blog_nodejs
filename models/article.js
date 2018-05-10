
const mongoose = require('mongoose');

var Article = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    title: {type: String, required: true, unique: true},
    content: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('article', Article);