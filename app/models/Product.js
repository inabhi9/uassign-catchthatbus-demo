// grab the mongoose module
var mongoose = require('mongoose');
var validator = require('validator');
var Helper = require('../common/helper.js');
var mongoosePaginate = require('mongoose-paginate');

var ProductSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    price: {type: Number, required: true, trim: true},
    images: [{
        url: {
            type: String,
            validate: [validator.isURL, 'Invalid url'],
            trim: true
        },
        is_main: {type: Boolean, default: false}
    }],
    is_active: {type: Boolean, required: true},
    qty: {type: Number, required: true},
    brand: {type: String, default: ''},
    condition: {type: String, default: 'new'},
    sku: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    categoryPath: {type: String, default: 'root'},
    is_featured: {type: Boolean, default: false}
});

ProductSchema.index({name: 'text', description: 'text', brand: 'text', category: 'text'});

// Pagination helper plugin
ProductSchema.plugin(mongoosePaginate);

var product = mongoose.model('Product', ProductSchema);

module.exports = product;
