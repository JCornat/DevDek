var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModelSchema = new Schema ({
    slug: {type:String, require:true},
    title: {type:String, require:true},
    subtitle: String,
    thumbnail: String,
    banner: String,
    publishedAt: String,
    content: String
});

module.exports = mongoose.model('Article', ModelSchema);
