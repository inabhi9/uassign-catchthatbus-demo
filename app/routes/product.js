/**
 * Created by abhinav on 14/11/15.
 */
var Product = require('../models/Product.js');
var Helper = require('../common/helper.js');

module.exports = function (app, passport, prefix) {
    app.get(prefix + '/products', function (req, res) {
        var fq = {};
        if (req.query.q) fq['$text'] = {$search: req.query.q};
        if (req.query.categoryPath) fq['categoryPath'] = req.query.categoryPath;
        if (req.query.is_featured == 'true') fq['is_featured'] = true;

        Product.paginate(fq, req.query, function (err, data, pageCount, itemCount) {
            if (data) {
                meta = {pageCount: pageCount, itemCount: itemCount};
                data = {items: data, meta: meta};
            }
            Helper.response(res, data, err, 200);
        })
    });
};
