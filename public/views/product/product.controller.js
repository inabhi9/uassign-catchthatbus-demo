/**
 * Created by abhinav on 14/11/15.
 */
angular.module('GrabKartApp').controller('ProductCtrl',
    ['$scope', '$state', 'ProductService', 'growl', '$rootScope', 'CartService', fn]);

/** @ngInject */
function fn($scope, $state, ProductService, growl, $rootScope, CartService) {
    $scope.mdl = {};
    //CartService.clear();
    console.log('itesm', CartService.getTotalCount());
    console.log('cart', CartService.getCart());
    ProductService.findFromActive($state.params).then(function (resp) {
        $scope.mdl.products = resp.data.items;
        $scope.mdl.meta = resp.data.meta
    });

    angular.extend($scope.mdl, {
        addToCart: function (id, item) {
            CartService.addItem(id, item);
            growl.success('Added to cart');
        }
    })
}
