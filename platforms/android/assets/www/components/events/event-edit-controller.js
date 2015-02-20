angular
.module('eventEditCtrlModule', [])
.controller('eventEditCtrl', ['$scope', 'eventService', '$routeParams',
function($scope, eventService, $routeParams){

    eventService.loadById($routeParams.eventId).success(function(data){
        $scope.event = data;
    });

    $scope.updateButton = function(event){
        eventService.updateEvent(event._id, event).success(function(data){
            $scope.event = data;
        });
    };
}]);
