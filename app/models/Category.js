// grab the mongoose module
var mongoose = require('mongoose');
var validator = require('validator');
var Helper = require('../common/helper.js');

var CategorySchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    path: {type: String, required: true, trim: true}
});

CategorySchema.static('all', function (callback) {
    return this.find({}, callback);
});

var category = mongoose.model('Category', CategorySchema, 'category');

module.exports = category;
