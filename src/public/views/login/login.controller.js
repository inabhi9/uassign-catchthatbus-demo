/**
 * Created by abhinav on 14/11/15.
 */
angular.module('GrabKartApp').controller('LoginCtrl', ['$scope', '$state', 'AuthService',
    'UserService', '$rootScope',
    fn]);

/** @ngInject */
function fn($scope, $state, AuthService, UserService, $rootScope) {
    $scope.kinds = [{key: 'buyer', value: 'Buyer'}, {key: 'seller', value: 'Seller'}];
    $scope.mdl = {
        login: {username: 'buyer@test.com', password: '123', kind: 'buyer'},
        signup: {}
    };

    $scope.login = function () {
        AuthService.login($scope.mdl.login).then(function (resp) {
            UserService.login(resp.data);
            $state.go('home');

        }, function (error) {
            console.log(error, 'err');
        });
    };

    $scope.signup = function () {
        console.log($scope.mdl.signup);
        AuthService.signup($scope.mdl.signup).then(function (resp) {
            UserService.login(resp.data);
            $state.go('home');
        }, function (error) {
            console.log(error, 'err');
        })
    }
};
