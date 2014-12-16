angular.module('controllers', [])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.totalPinnedVideos = 0;
    }])
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
    .controller('filterCtrl', ['$scope', '$rootScope', 'keywordVideoService', function ($scope, $rootScope, keywordVideoService) {
        $scope.keywords = "";
        $scope.queriedVideos = [];
        $scope.event = function () {
            keywordVideoService.getQueryVideos($scope.keywords).then(
                //success
         
                function (searchResults) {
                    $scope.queriedVideos = [];
                    $scope.queriedVideos = $scope.queriedVideos.concat(searchResults);
                },
                //failure
                function () {
                });
        
            console.log("event passed");
            $rootScope.$broadcast('queryEvent', [true, $scope.queriedVideos]);
        }

    }])
    .controller('VideoCtrl', ['$scope', '$rootScope', 'generalVideoService', 'videoConstants', 'pinVidModal', function ($scope, $rootScope, generalVideoService, videoConstants, pinVidModal) {
        $scope.queryFlag = false;
        $scope.queriedVideos = [];
        $scope.startIndex = 0;
        $scope.videos = [];
       

        $scope.$on('queryEvent', function (event, data) {
            $scope.queriedVideos = [];
            $scope.queriedVideos = $scope.queriedVideos.concat(data[1]);
            $scope.queryFlag = data[0];
            //clear the videos whenever we get a new query
            $scope.videos = [];
            $scope.startIndex = 0;
        });
        
        //Generally, we continuously retrieve videos from the database and update locally
        $scope.updateGeneralVideo = function (videoArray) {
            $scope.videos = $scope.videos.concat(videoArray);
            //increment startIndex for database after each load
            $scope.startIndex += videoConstants.AMOUNT_PER_LOAD;
        }

        $scope.getGeneralVideo = function (startIndex) {
            generalVideoService.getVideos(startIndex).then(
                //success
                function (videoArray) {
                    $scope.updateGeneralVideo(videoArray);
                },
                //failure
                function () {

                });
        }
        //Upon Query, we recieve a broadcast, and recieve the entire array of videos, and we update accordingly
        $scope.getQueryVideo = function () {
            $scope.videos = $scope.videos.concat($scope.queriedVideos.splice(0, videoConstants.AMOUNT_PER_LOAD));
        }

        $scope.getVideos = function () {
            console.log('gen vid: ' + $scope.videos.length);
            console.log('query vid: ' + $scope.queriedVideos.length);
            if ($scope.queryFlag) {
                $scope.getQueryVideo();
            }
            else {
                $scope.getGeneralVideo($scope.startIndex);
            }
        }

        $scope.pinVideo = function (title, embedHtml) {
            pinVidModal.pinVid(title, embedHtml);
            //update count, used for Tooltip in modal.html
            $rootScope.totalPinnedVideos = pinVidModal.getSize();
        }
    }])
    .controller('ModalCtrl', ['$scope', 'pinVidModal', function ($scope, pinVidModal) {
        $scope.pinnedVideos = [];
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
