var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Validation helper methods should return booleans
// and should be defined before the schema for readability

// Model Schema
var ModelSchema = new Schema ({
    slug : {
        type: String
    },
    title : {
        type: String
    },
    subtitle : {
        type: String
    },
    thumbnail : {
        type: String
    },
    banner : {
        type: String
    },
    publishedAt : {
        type: String
    },
    content : {
        type: String
    }
});

module.exports = mongoose.model('Article', ModelSchema);
