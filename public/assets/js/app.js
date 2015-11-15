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
        .config(['growlProvider', '$httpProvider', function (growlProvider, $httpProvider) {
            growlProvider.onlyUniqueMessages(false);
            growlProvider.globalReversedOrder(true);
            growlProvider.globalTimeToLive({success: 5000, error: 5000, warning: 3000, info: 4000});

            $httpProvider.interceptors.push('errorInterceptor');
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
        .factory('errorInterceptor', ['$window', '$q', 'growl', '$log', 'UserService', '$location',
            function ($window, $q, growl, $log, UserService, $location) {
                return {
                    responseError: function (rejection) {
                        try {
                            console.log(rejection);
                            // Display validation error message
                            if (rejection.data.name == "ValidationError") {
                                for (var err in rejection.data.errors) {
                                    console.log(err);
                                    var e = rejection.data.errors[err];
                                    growl.error(e.message.replace('Path ', ''), {title: e.name});
                                }

                                // When Angular has session but, backend session is expired
                            } else if (rejection.status == 401) {
                                UserService.logout();
                                $location.path('/login');

                                // Some generic error from the backend
                            } else if (rejection.data.error) {
                                growl.error(rejection.data.error.message);
                            }
                        } catch (e) {
                            var msg = "API server is unreachable. Please contact technical support!";
                            growl.error(msg, {title: 'ServerError!', ttl: -1});
                        }
                        return $q.reject(rejection);
                    }
                };
            }])
        .filter('nl2br', function ($sce) {
            return function (msg, is_xhtml) {
                var is_xhtml = is_xhtml || true;
                var breakTag = (is_xhtml) ? '<br />' : '<br>';
                var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
                return $sce.trustAsHtml(msg);
            }
        });
})();
