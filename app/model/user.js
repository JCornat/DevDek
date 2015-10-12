var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModelSchema = new Schema ({
    username: {type:String, require:true},
    password: {type:String, require:true},
    email: String,
    gender: String,
    address: String,
    admin: {type:Boolean, default: false}
});

module.exports = mongoose.model('User', ModelSchema);
