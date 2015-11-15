/**
 * Created by abhinav on 14/11/15.
 */
var Category = require('../models/Category.js');
var Helper = require('../common/helper.js');

module.exports = function (app, passport, prefix) {
    app.get(prefix + '/categories', function (req, res) {
        Category.all(function (err, data) {
            Helper.response(res, data, err, 201);
        });
    });

};
