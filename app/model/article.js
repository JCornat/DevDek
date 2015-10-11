var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Validation helper methods should return booleans
// and should be defined before the schema for readability

// Model Schema
var ModelSchema = new Schema ({
    name : {
        type: String
    }
});

module.exports = mongoose.model('Test', ModelSchema);