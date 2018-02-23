var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ad = require('./ad');
var User = require('./user');

var schema = new Schema({
    adId: {type: Schema.Types.ObjectId, required: true, ref: 'Ad'},
    revisedUserId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    userRating: {type: Number, min: 1, max: 5, default: 3},
    description: {
        type: String, required: function () {
            return this.description.length > 20;
        }
    }
});

module.exports = mongoose.model('Review', schema);