angular.module('controllers', [])
    .controller('dashboard', ['$scope', 'indexBootstrap', function ($scope, indexBootstrap) {
        $scope.name = indexBootstrap.video.name;
    }])
    .controller('LoginCtrl', ['$scope', function ($scope) {
        $scope.disableInput = new function () {
            console.log("form is submitted");
        }
    }])
    .controller('VideoCtrl', ['$scope', 'videoBootstrap', function ($scope, videoBootstrap) {
        videoBootstrap.getVideo().then(
            //success
            function (videoModel) {
                $scope.name = videoModel.Name;
            },
            //failure
            function () {

            });
    }]);