/**
 * Created by abhinav on 14/11/15.
 */
var crypto = require('crypto');
var config = require('../../config/main.js');

var helper = {
    response: function (res, data, err, code) {

        if (err) {
            if (err.name == 'ValidationError')
                code = 422;
            res.status(code).json(err);
            return;
        }
        res.status(code).json(data)
    },
    encryptPassword: function (rawPassword) {
        var cipher = crypto.createCipher('aes-256-cbc', config.salt);
        cipher.update(rawPassword, 'utf8', 'base64');

        return cipher.final('base64');
    },
    prepareFields: function (schema, exceptFields) {
        var fields = {};
        schema.eachPath(function (key, path) {
            if (exceptFields.indexOf(key) < 0 && key.slice(0, 2) !== '__') {
                fields[key] = true;
            }
        });

        return fields;
    },
    isValidPassword: function (user, password) {
        return helper.encryptPassword(password) == user.password;
    }
};


module.exports = helper;
