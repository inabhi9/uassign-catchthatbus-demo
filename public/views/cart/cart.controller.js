/**
 * Created by abhinav on 14/11/15.
 */
angular.module('GrabKartApp').controller('CartCtrl',
    ['$scope', '$state', 'growl', '$rootScope', 'CartService', fn]);

/** @ngInject */
function fn($scope, $state, growl, $rootScope, CartService) {
    $scope.mdl = {
        cartItems: CartService.getCart(),
        deleteItem: function (id) {
            CartService.deleteItem(id);
            $scope.mdl.cartItems = CartService.getCart();
        },
        addQty: function (id) {
            CartService.addQty(id);
            $scope.mdl.cartItems = CartService.getCart();
        },
        removeQty: function (id) {
            CartService.removeQty(id);
            $scope.mdl.cartItems = CartService.getCart();
        }
    };

    angular.extend($scope.mdl, {
        addToCart: function (id, item) {
            CartService.addItem(id, item);
            growl.success('Added to cart');
        }
    })
}
