angular
.module('userIndexCtrlModule', [])
.controller('userIndexCtrl', ['$scope', 'userService',
function($scope, userService){

    userService.loadAll().success(function(data){
        $scope.users = data;
    });

    $scope.deleteUser = function(id){
        userService.deleteUser(id).success(function(data){
            userService.loadAll().success(function(data){
                $scope.users = data;
            });
        });
    };
}]);
