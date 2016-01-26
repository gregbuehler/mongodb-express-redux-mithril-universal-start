var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    id: {type: String, required:true, unique:true},
    title: {type: String, required:true, unique:true},
    summary: {type: String},
    content: {type: String}, 
    created: {type: String},
    author: {type: Object, required:true, ref: 'User'}
});

var Post = module.exports = mongoose.model('Post', PostSchema);