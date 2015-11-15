/**
 * Created by abhinav on 14/11/15.
 */
var Product = require('../models/Product.js');
var Helper = require('../common/helper.js');
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/images/product-details')
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);

        cb(null, Date.now() + ext);
    }
});
var upload = multer({storage: storage});

module.exports = function (app, passport, prefix) {
    app.get(prefix + '/products', function (req, res) {
        var fq = {};
        if (req.query.q) fq['$text'] = {$search: req.query.q};
        if (req.query.categoryPath) fq['categoryPath'] = {'$regex': "^"+req.query.categoryPath.replace('|', '\\|')};
        if (req.query.is_featured == 'true') fq['is_featured'] = true;
        if (req.query.is_active == 'true') fq['is_active'] = true;

        Product.paginate(fq, req.query, function (err, data, pageCount, itemCount) {
            if (data) {
                meta = {pageCount: pageCount, itemCount: itemCount};
                data = {items: data, meta: meta};
            }
            Helper.response(res, data, err, 200);
        })
    });

    app.post(prefix + '/products', Helper.Auth.isSeller, upload.single('image'), function (req, res) {
        var product = new Product(req.body);
        console.log(req.file);
        if (req.file) {
            var base = req.protocol + '://' + req.get('host');
            product.images = [{url: base + '/assets/images/product-details/' + req.file.filename}]
        }

        product.save(function (err, product) {
            Helper.response(res, product, err, 201);
        })
    });

    app.put(prefix + '/products/:id', Helper.Auth.isSeller, upload.single('image'),
        function (req, res) {
            var id = req.params.id;

            if (req.file) {
                var base = req.protocol + '://' + req.get('host');
                req.body.images = [{url: base + '/assets/images/product-details/' + req.file.filename}]
            }

            Product.findByIdAndUpdate(id, {$set: req.body}, function (err, product) {
                return Helper.response(res, product, err, 200);
            })
        });

    app.delete(prefix + '/products/:id', Helper.Auth.isSeller, Helper.Auth.isSeller, function (req, res) {
        var id = req.params.id;

        Product.findByIdAndRemove(id, function (err, product) {
            return Helper.response(res, null, err, 204);
        })
    });

    app.get(prefix + '/products/:id', function (req, res) {
        var id = req.params.id;

        Product.findById(id, function (err, product) {
            return Helper.response(res, product, err, 200);
        })
    })
};
