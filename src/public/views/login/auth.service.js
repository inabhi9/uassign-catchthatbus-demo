/**
 * Created by abhinav on 14/11/15.
 */

angular.module('GrabKartApp').factory('AuthService', ['API', '$http', fn]);

/** @ngInject */
function fn(API, $http) {
    return {
        login: function (data) {
            return $http.post(API.baseURL + "/users/actions/login", data);
        },
        signup: function (data) {
            return $http.post(API.baseURL + "/users", data);
        },
        me: function () {
            return $http.get(API.baseURL + "/users/me");
        }
    }
};
