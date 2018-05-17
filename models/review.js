var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ad = require('./ad');
var User = require('./user');

var schema = new Schema({
    adId: { type: Schema.Types.ObjectId, required: true, ref: 'Ad' },
    reviserUserId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    qualityRate: { type: Number, min: 1, max: 5, required: true, },
    professionalismRate: { type: Number, min: 1, max: 5, required: true, },
    punctualityRate: { type: Number, min: 1, max: 5, required: true, },
    userRating: { type: Number, min: 1, max: 5, required: true, },
    title: { type: String, required: true },
    description: {
        type: String, required: function () {
            return this.description.length > 20;
        }
    },
    images: [{ type: String }]
});

module.exports = mongoose.model('Review', schema);