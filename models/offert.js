var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ad = require('./ad');
var User = require('./user');

var schema = new Schema({
    //TODO: required: true
    adId: {type: Schema.Types.ObjectId, required: false, ref: 'Ad'},
    // offererId: {type: Schema.Types.ObjectId, required: false, ref: 'User'},
    description: {
        type: String, required: function () {
            return this.description.length > 20;
        }
    },
    price: {type: Number, required: true},
    currency: {type: String, enum: ['RON', 'EUR'], default: 'RON'},
    status: {type: String, enum: ['holding', 'accepted', 'denied'], default: 'holding'}
});

module.exports = mongoose.model('Offert', schema);