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

    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

    $scope.getEventPhoto = function(photoEvent){

        cameraService.getPicture(options).then(function(imageData) {

            $scope.event.lastPhotoURI = "data:image/jpeg;base64," + imageData;

            eventService.updateEvent(photoEvent._id, photoEvent).success(function(data){
                $scope.event = data;
            });

        }, function(err) {
            console.err(err);
        });
    };
}]);
