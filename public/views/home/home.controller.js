/**
 * Created by abhinav on 14/11/15.
 */
angular.module('GrabKartApp').controller('HomeCtrl', ['$scope', '$state', 'ProductService', 'growl',
    'CartService', fn]);
/** @ngInject */
function fn($scope, $state, ProductService, growl, CartService) {
    $scope.mdl = {};

    ProductService.find({is_featured: true}).then(function (resp) {
        $scope.mdl.products = resp.data.items;
        $scope.mdl.meta = resp.data.meta
    });

    angular.extend($scope.mdl, {
        addToCart: function (id, item) {
            CartService.addItem(id, item);
            growl.success('Added to cart');
        }
    })
};
