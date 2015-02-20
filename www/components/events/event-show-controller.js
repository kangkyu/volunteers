angular
.module('eventShowCtrlModule', [])
.controller('eventShowCtrl',['$scope', '$stateParams', 'eventService',
function($scope, $stateParams, eventService){

    eventService.loadById($stateParams.eventId).success(function(data){
        $scope.event = data;
    });

    $scope.deleteButton = function(eventId){
        eventService.deleteEvent(eventId).success(function(){
            eventService.loadAll().success(function(data){
                $scope.events = data;
            });
        });
    };
}]);
