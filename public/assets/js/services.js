angular.module('GrabKartApp')
    .service('UserService', function ($window, $location) {
        var userData = null;

        this.login = function (data) {
            userData = data;

            $window.sessionStorage.setItem('user', angular.toJson(data));
            return true;

        };

        this.isLoggedIn = function () {
            return !!$window.sessionStorage.getItem('user');

        };

        this.logout = function () {
            $window.sessionStorage.removeItem('user');
        };

        this.get = function () {
            return angular.fromJson($window.sessionStorage.getItem('user'));
        };

        this.checkLogin = function () {
            if (this.isLoggedIn() === false && $location.path() != '/login') {
                $location.path('/login');
            }
        }
    }).service('CartService', function ($window) {
        var self = this;

        this.addItem = function (id, item, qty) {
            var cart = self.getCart();
            if (!cart) cart = {};
            if (typeof qty == 'undefined') qty = 1;
            if (typeof cart[id] != 'undefined') {
                cart = self.getCart();
                cart[id]['qty'] += qty;
            }
            else {
                cart[id] = {item: item, qty: qty};
            }
            self._setCart(cart);
            return true;

        };

        this.getCart = function () {
            return angular.fromJson($window.sessionStorage.getItem('cart'));
        };

        this.deleteItem = function (id) {
            var cart = self.getCart();
            delete cart[id];

            self._setCart(cart);
        };

        this.updateQty = function (id, qty) {
            var cart = self.getCart();
            cart[id]['qty'] = qty;
            self._setCart(cart);
        };

        this.getTotalCount = function () {
            var cart = self.getCart();
            try {
                return Object.keys(cart).length;
            } catch (e) {
                return 0;
            }

        };

        this._setCart = function (cart) {
            $window.sessionStorage.setItem('cart', angular.toJson(cart));
        };

        this.clear = function () {
            $window.sessionStorage.removeItem('cart');
        };

        this.addQty = function (id) {
            var cart = self.getCart();
            if (cart[id]['qty'] == 10) return;
            cart[id]['qty']++;
            self._setCart(cart);
        }

        this.removeQty = function (id) {
            var cart = self.getCart();
            if (cart[id]['qty'] == 1) return;
            cart[id]['qty']--;
            self._setCart(cart);
        };

        this.getTotal = function () {
            var cart = self.getCart();
            var total = 0;
            for (var k in cart) {
                total += cart[k].qty * cart[k].item.price;
            }

            return total;
        }
    });
