angular.module('controllers', [])
    //.controller('dashboard', ['$scope', 'indexBootstrap', function ($scope, indexBootstrap) {
    //    $scope.name = indexBootstrap.video.name;
    //}])
    .controller('LoginCtrl', ['$scope', function ($scope) {
        $scope.disableInput = new function () {
            console.log("form is submitted");
        }
    }])
    .controller('VideoCtrl', ['$scope', '$location', 'videoBootstrap','videoConstants', function ($scope, $location, videoBootstrap, videoConstants) {
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
    }]);