/**
 * Created by abhinav on 14/11/15.
 */
var User = require('../models/User.js');
var Helper = require('../common/helper.js');

module.exports = function (app, passport, prefix) {
    app.post(prefix + '/users', function (req, res, next) {
        passport.authenticate('signup', function (err, user, info) {
            if (req.isAuthenticated()) {
                err = {error: {message: 'Already login please logout', code: 100}};
                return Helper.response(res, user, err, 400);
            }
            if (err)
                return Helper.response(res, user, err, 400);

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return Helper.response(res, user, err, 201);
            });
        })(req, res, next);

    });

    app.post(prefix + '/users/actions/login', function (req, res, next) {
        passport.authenticate('login', function (error, user, info) {
            if (error) {
                error = {error: {message: error}};
                return Helper.response(res, user, error, 401);
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return Helper.response(res, user, error, 200);
            });

        })(req, res, next);
    });

    app.get(prefix + '/users/actions/logout', function (req, res) {
        req.logout();
        return Helper.response(res, null, null, 200);
    });

    app.get(prefix + '/users/me', function (req, res) {
        var code = 401;
        if (req.isAuthenticated()) code = 200;

        return Helper.response(res, req.user, null, code);
    })
};
