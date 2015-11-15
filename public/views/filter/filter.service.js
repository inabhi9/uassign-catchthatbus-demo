/**
 * Created by abhinav on 14/11/15.
 */

angular.module('GrabKartApp').factory('CategoryService', ['API', '$http', fn]);

/** @ngInject */
function fn(API, $http) {
    return {
        all: function () {
            return $http.get(API.baseURL + "/categories");
        }
    }
};
