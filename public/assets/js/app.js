(function () {
    'use strict';

    angular
        .module('GrabKartApp', ['oc.lazyLoad',
            'ngSanitize',
            'ngResource',
            'ui.router',
            'ui.bootstrap',
            'ui.bootstrap',
            'angular-growl',
            'ngFileUpload',
        ])
        .run(["$rootScope", function ($rootScope) {
            $rootScope.dateFormat = 'dd-MMMM-yyyy';
        }])
        .config(['growlProvider', function (growlProvider) {
            growlProvider.onlyUniqueMessages(false);
            growlProvider.globalReversedOrder(true);
            growlProvider.globalTimeToLive({success: 1000, error: 2000, warning: 3000, info: 4000});
        }])
        .controller('AppController', ['$scope', '$rootScope', '$state', '$location', 'UserService',
            'CartService',
            function ($scope, $rootScope, $state, $location, UserService, CartService) {
                $rootScope.user = UserService;
                $rootScope.cart = CartService;
                $scope.term = $location.search().q;
                $scope.search = function () {
                    var newState = '.';

                    if ($state.current.name !== 'seller.product-list') {
                        newState = 'product'
                    }
                    $state.go(newState, {q: this.term});
                };

                // Auth redirection
                $rootScope.$on("$stateChangeStart", function (e, toState) {

                    // Redirect seller to seller page
                    if (UserService.isLoggedIn()) {
                        if (UserService.get().kind == 'seller' &&
                            toState.name.indexOf('seller') < 0 && toState.name != 'logout') {
                            e.preventDefault();
                            $state.go('seller.product-list');
                        } else if (UserService.get().kind == 'buyer' &&
                            toState.name.indexOf('seller') >= 0) {
                            e.preventDefault();
                            $state.go('home');
                        }

                    }

                    // Redirect user to dashboard If user is logged and tries to load login
                    if (UserService.isLoggedIn() && toState.name === "login") {
                        e.preventDefault();
                        $state.go('home');
                    }
                });
            }])

})();
