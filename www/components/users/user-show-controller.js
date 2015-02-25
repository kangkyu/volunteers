angular
.module('userShowCtrlModule',[])
.controller('userShowCtrl', ['$scope','$stateParams','userService',
function($scope,$stateParams,userService){

    userService.loadById($stateParams.userId).success(function(data){
        $scope.user = data;
    });
}]);