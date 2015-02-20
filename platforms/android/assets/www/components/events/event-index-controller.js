angular
.module('eventIndexCtrlModule', [])
.controller('eventIndexCtrl', ['$scope', 'eventService',
function($scope, eventService){

    eventService.loadAll().success(function(data){
        $scope.events = data;
    });

    $scope.deleteButton = function(eventId){
        eventService.deleteEvent(eventId).success(function(){
            eventService.loadAll().success(function(data){
                $scope.events = data;
            });
        });
    };

    $scope.predicate = '_id'
}]);
