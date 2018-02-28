var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');
var Category = require('./category');
var Offert = require('./offert');

var tomorrowDate = () => {
    return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
}

var dateValidator = [function (date) { return date > Date.now(); }, 'Data minima de o zi'];

var schema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    expirationDate: {
        type: Date,
        default: tomorrowDate,
        validate: dateValidator
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    // images: [{type: Buffer}],
    categoryId: {type: Schema.Types.ObjectId, required: true, ref: 'Category'},
    location: {
        lat: { type: String },
        lng: { type: String }
    },
    offertsId: [{type: Schema.Types.ObjectId, ref: 'Offert'}],
    selectedOffertId: {type: Schema.Types.ObjectId, ref: 'Offert'}
});

module.exports = mongoose.model('Ad', schema);