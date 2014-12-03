angular.module('controllers', [])
    .controller('dashboard', ['$scope', 'indexBootstrap', function ($scope, indexBootstrap) {
        $scope.name = indexBootstrap.video.name;
    }])
    .controller('LoginCtrl', ['$scope', function ($scope) {
        $scope.disableInput = new function () {
            console.log("form is submitted");
        }
    }])
    .controller('VideoCtrl', ['$scope', '$location', 'videoBootstrap', function ($scope, $location, videoBootstrap) {
        $scope.showVid = false;
        $scope.moreVideos = function () {
            //console.log("the path is: " + $location.path());
            //console.log("the host is: " + $location.host());
        $scope.showVid = true;
        //$location.path('/videos');
        videoBootstrap.getVideo().then(
            //success
            function (videoModel) {
                $scope.name = videoModel.Name;
            },
            //failure
            function () {

            });

        }
    }]);