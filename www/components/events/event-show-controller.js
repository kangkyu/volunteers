angular
.module('eventShowCtrlModule', [])
.controller('eventShowCtrl',['$scope', '$stateParams', 'eventService', 'cameraService',
function($scope, $stateParams, eventService, cameraService){

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

    $scope.getEventPhoto = function(event){
        cameraService.getPicture(options).then(function(imageData) {

            console.log(imageData);
            event.lastPhotoURI = "data:image/jpeg;base64," + imageData;

            // var image = document.getElementById('myImage');
            // image.src = "data:image/jpeg;base64," + imageData;

        }, function(err) {
            console.err(err);
        });

        eventService.updateEvent(event._id, event).success(function(data){
            $scope.event = data;
            console.log($scope.event);
        });
    };
}]);
