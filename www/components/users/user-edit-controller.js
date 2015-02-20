angular
.module('userEditCtrlModule',[])
.controller('userEditCtrl', ['$scope', '$stateParams', 'userService',
function($scope, $stateParams, userService){

    userService.loadById($stateParams.userId).success(function(data){
        $scope.user = data;
    });

    $scope.updateUser = function(user){
        userService.updateUser(user._id, user).success(function(data){
            $scope.user = data;
        });
    };
}]);
