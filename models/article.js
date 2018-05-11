
const mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
    
var Article = new Schema({
    id: {type: Number, required: true, unique: true},
    title: {type: String, required: true, unique: true},
    content: {type: String, required: true},
    description: {type: String, required: true},
    userID: {type: Schema.ObjectId, ref: 'user' }
}, {
    timestamps: true
});

module.exports = mongoose.model('article', Article);