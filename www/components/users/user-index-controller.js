angular
.module('userIndexCtrlModule', [])
.controller('userIndexCtrl', ['$scope', 'userService', 'cameraService',
function($scope, userService, cameraService){

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
