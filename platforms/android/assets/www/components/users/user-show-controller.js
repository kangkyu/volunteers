angular
.module('userShowCtrlModule',[])
.controller('userShowCtrl', ['$scope','$routeParams','userService','eventService',
function($scope,$routeParams,userService,eventService){

    userService.loadById($routeParams.userId).success(function(data){
        $scope.user = data;
    });
}]);