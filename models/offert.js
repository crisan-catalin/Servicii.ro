var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ad = require('./ad');
var User = require('./user');
var Review = require('./review');

var schema = new Schema({
    adId: { type: Schema.Types.ObjectId, required: true, ref: 'Ad' },
    offererId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review' },
    description: {
        type: String, required: function () {
            return this.description.length > 20;
        }
    },
    price: { type: Number, required: true },
    currency: { type: String, enum: ['RON', 'EUR'], required: true },
    status: { type: String, enum: ['holding', 'accepted', 'denied'], default: 'holding' }
});

module.exports = mongoose.model('Offert', schema);