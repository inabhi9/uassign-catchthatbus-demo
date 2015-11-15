/**
 * Created by abhinav on 15/11/15.
 */

var Helper = require('../app/common/helper.js'),
    User = require('../app/models/User.js'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({'email': username, 'kind': req.body.kind},
                function (err, user) {
                    console.log(user);
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log error & redirect back
                    if (!user) {
                        console.log('User Not Found with username ' + username);
                        return done('User Not Found with username ' + username)
                    }
                    // User exists but wrong password, log the error
                    if (!Helper.isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done('Invalid Password');
                    }
                    // User and password both match, return user from
                    // done method which will be treated like success
                    return done(null, user);
                }
            );
        }
    ));

    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({email: email}, function (err, user) {
            if (err) return done(err);

            if (user) return done({error: {message: 'That email is already taken.'}});

            user = new User(req.body);
            user.save(function (err, data) {
                if (err) return done(err);

                return done(null, user);
            });
        })

    }))
};
