angular
.module('eventEditCtrlModule', [])
.controller('eventEditCtrl', ['$scope', 'eventService', '$stateParams',
function($scope, eventService, $stateParams){

    eventService.loadById($stateParams.eventId).success(function(data){
        $scope.event = data;
    });

    $scope.updateButton = function(event){
        eventService.updateEvent(event._id, event).success(function(data){
            $scope.event = data;
        });
    };
}]);
