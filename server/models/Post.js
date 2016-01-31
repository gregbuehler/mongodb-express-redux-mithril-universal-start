var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    id: {type: String, required:true, unique:true},
    title: {type: String, required:true, unique:true},
    summary: {type: String},
    content: {type: String}, 
    created: {type: Date},
    author: {type: mongoose.Schema.ObjectId, required:true, ref: 'User'}
});

var Post = module.exports = mongoose.model('Post', PostSchema);
