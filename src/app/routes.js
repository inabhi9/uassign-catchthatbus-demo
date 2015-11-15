UserRoute = require('./routes/user.js');
CategoryRoute = require('./routes/category.js');
ProductRoute = require('./routes/product.js');

module.exports = function (app, passport) {
    var prefix = '/api/v1';

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    UserRoute(app, passport, prefix);
    CategoryRoute(app, passport, prefix);
    ProductRoute(app, passport, prefix);

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res, next) {
        res.sendfile('./public/index.html');
    });
};
