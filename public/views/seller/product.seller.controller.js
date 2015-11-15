/**
 * Created by abhinav on 14/11/15.
 */
angular.module('GrabKartApp').controller('Seller.ProductCtrl',
    ['$scope', '$state', 'ProductService', 'growl', '$rootScope', '$location', 'CategoryService',
        'Upload',
        fn]);

/** @ngInject */
function fn($scope, $state, ProductService, growl, $rootScope, $location, CategoryService, Upload) {
    $scope.mdl = {product: {is_active: false}};
    $scope.isNew = $state.current.name == 'seller.product-create';

    function loadProducts() {
        ProductService.find($state.params).then(function (resp) {
            $scope.mdl.products = resp.data.items;
            $scope.mdl.meta = resp.data.meta;
            $scope.mdl.page.currentPage = $state.params.page;
        });
    }

    function loadProduct() {
        ProductService.get($state.params.id).then(function (resp) {
            $scope.mdl.product = resp.data;
        })
    }

    if (!$scope.isNew) loadProduct();

    CategoryService.all().then(function (resp) {
        $scope.mdl.categories = resp.data;
    });


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
                $scope.mdl.product = {is_active: false};
            })
        },
        update: function () {
            ProductService.update($state.params.id, $scope.mdl.product).then(function (resp) {
                growl.success('Item update successfully');
            })
        },
        page: {
            pageSize: 10,
            changed: function () {
                $state.go('.', {page: $scope.mdl.page.currentPage})
            }
        }
    });

    loadProducts();
}
