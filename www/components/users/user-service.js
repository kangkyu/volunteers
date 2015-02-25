angular
.module('userServiceModule', [])
.factory('userService', ['$http',
function($http){
    var userService = {};
    var baseUrl = 'http://localhost:3000/api/users';
    // var baseUrl = 'http://104.236.237.119:3000/api/users'

    userService.loadAll = function(){
        return $http.get(baseUrl);
    };

    userService.loadById = function(id){
        return $http.get(baseUrl + '/' + id);
    };
    
    userService.deleteUser = function(id){
        return $http.delete(baseUrl + '/' + id);
    };


    userService.addUser = function(user){
        return $http.post(baseUrl, user);
    };

    userService.updateUser = function(id, user){
        return $http.put(baseUrl + '/' + id, user);
    };

    return userService;
}]);
