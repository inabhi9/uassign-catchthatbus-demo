/**
 * Created by abhinav on 14/11/15.
 */
angular.module('GrabKartApp').controller('SellerCtrl',
    ['$scope', '$state', 'growl', '$rootScope', fn]);

/** @ngInject */
function fn($scope, $state, ProductService, growl, $rootScope, CartService) {
    $scope.mdl = {};

}
