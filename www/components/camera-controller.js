angular
.module('cameraCtrlModule',[])
.controller('cameraCtrl', function($scope, cameraService) {

    document.addEventListener("deviceready", function () {

        console.log('Getting camera');
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

        $scope.getPhoto = function(){
            cameraService.getPicture(options).then(function(imageData) {

                console.log(imageData);
                $scope.lastPhotoURI = "data:image/jpeg;base64," + imageData;

                // var image = document.getElementById('myImage');
                // image.src = "data:image/jpeg;base64," + imageData;

            }, function(err) {
                console.err(err);
            });
        };

        // $cordovaCamera.cleanup().then(...); 
        // only for FILE_URI

    }, false);

});
