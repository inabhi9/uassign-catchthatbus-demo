(function () {
    'use strict';

    angular
        .module('GrabKartApp')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true
        });
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    "@": {
                        templateUrl: 'views/home/home.html',
                        controller: 'HomeCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'views/product/product.service.js',
                                        'views/home/home.controller.js'
                                    ]
                                });
                            }]
                        }
                    },
                    "category@home": {
                        templateUrl: 'views/filter/filter.html',
                        controller: 'FilterCtrl as ctrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'views/filter/filter.service.js',
                                        'views/filter/filter.controller.js'
                                    ]
                                });
                            }]
                        }
                    }
                }
            })
            .state('product', {
                url: '/product?categoryPath&q&page',
                views: {
                    "@": {
                        templateUrl: 'views/product/product.html',
                        controller: 'ProductCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'views/product/product.service.js',
                                        'views/product/product.controller.js'
                                    ]
                                });
                            }]
                        }
                    },
                    "category@product": {
                        templateUrl: 'views/filter/filter.html',
                        controller: 'FilterCtrl as ctrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'views/filter/filter.service.js',
                                        'views/filter/filter.controller.js'
                                    ]
                                });
                            }]
                        }
                    }
                }
            })
            .state('cart', {
                url: '/cart',
                views: {
                    "@": {
                        templateUrl: 'views/cart/cart.html',
                        controller: 'CartCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'views/cart/cart.controller.js'
                                    ]
                                });
                            }]
                        }
                    }
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    "@": {
                        templateUrl: 'views/login/login.html',
                        controller: 'LoginCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'views/login/auth.service.js',
                                        'views/login/login.controller.js'
                                    ]
                                });
                            }]
                        }
                    }
                }
            })
            .state('logout', {
                url: '/logout',
                controller: ['$state', 'UserService', function ($state, UserService) {
                    UserService.logout();
                    $state.go('home');
                }]
            })
            .state('seller', {
                url: '/seller',
                views: {
                    "@": {
                        templateUrl: 'views/seller/seller.html',
                        controller: 'SellerCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'views/seller/seller.controller.js'
                                    ]
                                });
                            }]
                        }
                    }
                }
            })
            .state('seller.product-list', {
                url: '/products/list?page&q',
                views: {
                    "": {
                        templateUrl: 'views/seller/products.html',
                        controller: 'Seller.ProductCtrl as ctrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'views/product/product.service.js',
                                        'views/seller/product.seller.controller.js',
                                        'views/filter/filter.service.js'
                                    ]
                                });
                            }]
                        }
                    }
                }
            })
            .state('seller.product-create', {
                url: '/products/create',
                views: {
                    "": {
                        templateUrl: 'views/seller/form.product.html',
                        controller: 'Seller.ProductCtrl as ctrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'views/product/product.service.js',
                                        'views/seller/product.seller.controller.js',
                                        'views/filter/filter.service.js'
                                    ]
                                });
                            }]
                        }

                    }
                }
            })
            .state('seller.product-update', {
                url: '/products/:id/update',
                views: {
                    "": {
                        templateUrl: 'views/seller/form.product.html',
                        controller: 'Seller.ProductCtrl as ctrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'views/product/product.service.js',
                                        'views/seller/product.seller.controller.js',
                                        'views/filter/filter.service.js'
                                    ]
                                });
                            }]
                        },
                    }
                }
            })

    }

})();
