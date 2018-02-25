var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    //Ex. location: {lat: 221.231, long: -32.23232}
    location: { type: Schema.Types.Mixed },
    experienceYears: { type: Number, default: 0 },
    biography: { type: String }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);