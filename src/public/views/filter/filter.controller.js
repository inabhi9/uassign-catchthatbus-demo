/**
 * Created by abhinav on 14/11/15.
 */

angular.module('GrabKartApp').controller('FilterCtrl', ['$scope', '$state', 'CategoryService', fn]);

/** @ngInject */
function fn($scope, $state, CategoryService) {
    var $this = this;

    CategoryService.all().then(function (resp) {
        $this.categories = resp.data;
        console.log($this.categories);
        $this.categories.push({name: 'ALL', path: 'root'})
    });
};
