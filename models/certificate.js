var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ad = require('./ad');
var User = require('./user');
var Category = require('./category');

var schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    title: { type: String, required: true },
    filePath: { type: String, required: true }
});

module.exports = mongoose.model('Certificate', schema);