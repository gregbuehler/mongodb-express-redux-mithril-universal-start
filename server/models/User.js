var mongoose = require('mongoose');
// var Email = require('mongoose-type-email');

var UserSchema = new mongoose.Schema({
    id: {type: String, required:true, unique:true},
    userid: {type: String, required:true, unique:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true, bcrypt: true}, // used with bcrypt
    verified: {type:Boolean, default:false},
    role: {type:String, default:'member'}
});

UserSchema.plugin(require('mongoose-bcrypt'));
var User = module.exports = mongoose.model('User', UserSchema);