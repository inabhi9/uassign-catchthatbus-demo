/**
 * Created by abhinav on 14/11/15.
 */

angular.module('GrabKartApp').factory('ProductService', ['API', '$http', 'Upload', fn]);

/** @ngInject */
function fn(API, $http, Upload) {
    return {
        find: function (query) {
            return $http.get(API.baseURL + "/products", {params: query});
        },
        findFromActive: function(query){
            query['is_active'] = true;
            return $http.get(API.baseURL + "/products", {params: query});
        },
        delete: function (id) {
            return $http.delete(API.baseURL + "/products/" + id);
        },
        create: function(data){
            return Upload.upload({
                url: API.baseURL + "/products",
                data: data
            });
        },
        update: function(id, data){
            return Upload.upload({
                url: API.baseURL + "/products/"+id,
                data: data,
                method: 'put'
            });
        },
        get: function(id){
            return $http.get(API.baseURL + "/products/" + id);
        }
    }
};
