/**
 * Created by abhinav on 14/11/15.
 */

angular.module('GrabKartApp').factory('ProductService', ['API', '$http', fn]);

/** @ngInject */
function fn(API, $http) {
    return {
        find: function (query) {
            return $http.get(API.baseURL + "/products", {params: query});
        },
        addToCart: function (id) {
            return $http.post(API.baseURL + "/cart", {product_id: id});
        }
    }
};
