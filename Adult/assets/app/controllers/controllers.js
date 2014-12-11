angular.module('controllers', [])
    //.controller('dashboard', ['$scope', 'indexBootstrap', function ($scope, indexBootstrap) {
    //    $scope.name = indexBootstrap.video.name;
    //}])
    .controller('LoginCtrl', ['$scope', function ($scope) {
        $scope.disableInput = new function () {
            //console.log("form is submitted");
        }
    }])
    /*
     VideoCtrl: Continuously makes AJAX calls to MongoDB for more videos as the user scrolls. Pinned videos have
                their title,embededHtml added to 'pinVidModal' service for ModalCtrl.

     ModalCtrl: calls 'pinVidModal' to retrieve videos, the serivce handles how many pinned videos are passed,
                it uses the constant AMOUNT_PER_LOAD as does VideoCtrl
                
     */

    .controller('VideoCtrl', ['$scope', 'videoBootstrap', 'videoConstants', 'pinVidModal', function ($scope, videoBootstrap, videoConstants, pinVidModal) {
        $scope.startIndex = 0;
        $scope.videos = [];

        $scope.initVideo = function (videos) {
            $scope.videos = $scope.videos.concat(videos);
            //increment startIndex for database after each load
            $scope.startIndex += videoConstants.AMOUNT_PER_LOAD;
        }

        $scope.getVideos = function (startIndex) {
            videoBootstrap.getVideos(startIndex).then(
                //success
                function (videoArray) {
                    $scope.initVideo(videoArray);
                },
                //failure
                function () {

                });
        }
        $scope.pinVideo = function (title, embedHtml) {
            pinVidModal.pinVid(title, embedHtml);
        }
    }])
    .controller('ModalCtrl', ['$scope', 'pinVidModal', function ($scope, pinVidModal) {
        $scope.pinnedVideos = [];
        $scope.updatePinnedVideos = function () {
            $scope.updatePinnedVideos = pinVidModal.getAllVid();
        }
        $scope.getPinnedVideos = function () {
            $scope.pinnedVideos = $scope.pinnedVideos.concat(pinVidModal.getVid());
           
                
            
        }
    }]);
    //.controller('ModalCtrl', ['$scope', 'pinVidModal', 'videoConstants', function ($scope, pinVidModal, videoConstants) {
    //    $scope.rootVideos = [];
    //    $scope.childVideos = [];
    //    $scope.updateRootVideos = function () {
    //        $scope.rootVideos.push(pinVidModal.getPinVids());
    //    }
    //    $scope.updateChildVideos = function () {
    //        update main array
    //        $scope.updateRooteVideos();

    //        $scope.amount = videoConstants.AMOUNT_PER_LOAD;
    //        if ($scope.rootVideos.length < amount) { $scope.amount = $scope.rootVideos.length; }
    //        for (var i = 0; i < amount; i++) {
    //            $scope.childVideos.push($scope.rootVideos.pop());
    //        }
    //    }
    //}]);
