angular
.module('userServiceModule', [])
.factory('userService', ['$http',
function($http){
    var userService = {};

    userService.loadAll = function(){
        return $http.get('http://localhost:3000/api/users');
    };

    userService.loadById = function(id){
        return $http.get('http://localhost:3000/api/users' + '/' + id);
    };
    
    userService.deleteUser = function(id){
        return $http.delete('http://localhost:3000/api/users' + '/' + id);
    };


    userService.addUser = function(user){
        return $http.post('http://localhost:3000/api/users', user);
    };

    userService.updateUser = function(id, user){
        return $http.put('http://localhost:3000/api/users' + '/' + id, user);
    };

    return userService;
}]);
