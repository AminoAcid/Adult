angular.module('controllers', [])
    .controller('LoginCtrl', ['$scope', function ($scope) {
        $scope.disableInput = new function () {
            console.log("form is submitted");
        }
    }])
    .controller('VideoCtrl', ['$scope', 'videoBootstrap', function ($scope, videoBootstrap) {
        videoBootstrap.getVideo().then(
            //success
            function (videoModel) {
                $scope.name = videoBootstrap.videoModel.Name;
            },
            //failure
            function () {

            });
    }]);