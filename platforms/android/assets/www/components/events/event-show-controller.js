angular
.module('eventShowCtrlModule', [])
.controller('eventShowCtrl',['$scope', '$routeParams', 'eventService',
function($scope, $routeParams, eventService){

    eventService.loadById($routeParams.eventId).success(function(data){
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
