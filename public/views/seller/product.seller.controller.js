/**
 * Created by abhinav on 14/11/15.
 */
angular.module('GrabKartApp').controller('Seller.ProductCtrl',
    ['$scope', '$state', 'ProductService', 'growl', '$rootScope', '$location', fn]);

/** @ngInject */
function fn($scope, $state, ProductService, growl, $rootScope, $location) {
    $scope.mdl = {};

    function loadProducts() {
        ProductService.find($state.params).then(function (resp) {
            $scope.mdl.products = resp.data.items;
            $scope.mdl.meta = resp.data.meta;
            $scope.mdl.page.currentPage = $state.params.page;
        });
    }


    angular.extend($scope.mdl, {
        delete: function (id) {
            ProductService.delete(id).then(function (resp) {
                growl.success('Item deleted successfully');
                loadProducts();

            });
        },
        create: function () {
            ProductService.create($scope.mdl.product).then(function (resp) {
                growl.success('Item created successfully');
            }, function (err) {
                growl.error(err.message);
            })
        },
        page: {
            pageSize: 10,
            changed: function () {
                $state.go('.', {page: $scope.mdl.page.currentPage})
            }
        }
    })

    loadProducts();
}
