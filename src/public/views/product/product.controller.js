/**
 * Created by abhinav on 14/11/15.
 */
angular.module('GrabKartApp').controller('ProductCtrl',
    ['$scope', '$state', 'ProductService', 'growl', '$rootScope', 'CartService', fn]);

/** @ngInject */
function fn($scope, $state, ProductService, growl, $rootScope, CartService) {
    $scope.mdl = {};
    $scope.cartQty = 1;
    //CartService.clear();
    console.log('itesm', CartService.getTotalCount());
    console.log('cart', CartService.getCart());
    ProductService.findFromActive($state.params).then(function (resp) {
        $scope.mdl.products = resp.data.items;
        $scope.mdl.meta = resp.data.meta;
        $scope.mdl.page.currentPage = $state.params.page;
    });

    if ($state.params.id) {
        var id = $state.params.id;
        ProductService.get(id).then(function (resp) {
            $scope.mdl.product = resp.data
        });
    }

    angular.extend($scope.mdl, {
        addToCart: function (id, item, qty) {
            CartService.addItem(id, item, qty);
            growl.success('Added to cart');
        },
        page: {
            pageSize: 10,
            changed: function () {
                $state.go('.', {page: $scope.mdl.page.currentPage})
            }
        }
    })


}
