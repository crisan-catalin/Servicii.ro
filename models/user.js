var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Location = require('./location');

var schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    phone: {type: String},
    locationId: {type: Schema.Types.ObjectId, ref: 'Location'},
    regularUser: {type: Boolean, default: true},
    experienceYears: {type: Number, default: 0},
    biography: {type: String}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);