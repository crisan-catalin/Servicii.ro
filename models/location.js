var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    country: {type: String, required: true},
    city: {type: String, required: true},
    street: {type: String, required: true},
    number: {type: Number, min: 1, required: true},
});

module.exports = mongoose.model('Location', schema);