angular.module('controllers', [])
    //.controller('dashboard', ['$scope', 'indexBootstrap', function ($scope, indexBootstrap) {
    //    $scope.name = indexBootstrap.video.name;
    //}])
    .controller('LoginCtrl', ['$scope', function ($scope) {
        $scope.disableInput = new function () {
            console.log("form is submitted");
        }
    }])
    .controller('VideoCtrl', ['$scope', '$location', 'videoBootstrap', function ($scope, $location, videoBootstrap) {
        $scope.initVideo = function (videos) {
            $scope.videos = videos;
            $scope.embed = $scope.videos.embed;
        }

        $scope.moreVideos = function () {
            videoBootstrap.getVideo().then(
                //success
                function (videoArray) {
                    $scope.initVideo(videoArray);
                },
                //failure
                function () {

                });
        }
    }]);