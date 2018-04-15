var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    //Ex. location: {lat: 221.231, lng: -32.23232}
    location: { type: Schema.Types.Mixed },
    biography: { type: String },
    notificationEnabled: { type: Boolean, default: false },
    experienceYears: { type: Number, default: 0 },
    notificationRange: { type: Number, default: 0 },
    notificationCategories: [{ type: Schema.Types.ObjectId, ref: 'Category', unique: true }],
    certificates: [{ type: String, unique: true }]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);