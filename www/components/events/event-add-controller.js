angular
.module('eventAddCtrlModule', [])
.controller('eventAddCtrl', ['$scope', 'eventService',
function($scope, eventService){

    $scope.addButton = function(event){
        eventService.addEvent(event).success(function(data){
            $scope.event = data;
        });
    };
}]);
