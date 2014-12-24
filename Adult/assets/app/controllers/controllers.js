angular.module('controllers', [])
    .run(['$rootScope', function ($rootScope) {
        //for tooltip purposes
        $rootScope.totalPinnedVideos = 0;
    }])
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
    .controller('CategoryCtrl', ['$scope', '$rootScope', 'getCategoryService', 'pinTagService', function ($scope, $rootScope, getCategoryService, pinTagService) {
        $scope.popularTags = [];
        $scope.getPopularTags = function () {
            getCategoryService.tags().then(
                function (Tags) {
                    $scope.popularTags = $scope.popularTags.concat(Tags.popularTags);
                },
                function () {

                });
        }

        $scope.bindTagForFilter = function (tag) {
            pinTagService.addTag(tag);
            $rootScope.$broadcast('tagFilterUpdate');
        }
    }])
    .controller('SearchCtrl', ['$scope', '$rootScope', 'keywordVideoService', function ($scope, $rootScope, keywordVideoService) {
        $scope.queryString = "";
        $scope.keywords = "";
        $scope.queriedVideos = [];

        $scope.keywordQuery = function (keywords) {
            keywordVideoService.getQueryVideos(keywords).then(
                function (searchResults) {
                    $scope.queriedVideos = [];
                    $scope.queriedVideos = $scope.queriedVideos.concat(searchResults);
                },
                function () {
                });
            console.log($scope.queriedVideos.length);
            $rootScope.$broadcast('queryResult', [true, $scope.queriedVideos]);
        }
        
      
    }])
    .controller('VideoCtrl', ['$scope', '$rootScope','$interval', 'generalVideoService', 'videoConstants', 'pinVidModal','pinTagService', function ($scope, $rootScope, $interval, generalVideoService, videoConstants, pinVidModal, pinTagService) {
        $scope.queryFlag = false;
        $scope.queriedVideos = [];
        $scope.startIndex = 0;
        $scope.videos = [];
        $scope.tagsForQuery = [];
        $scope.videosLoaded = false;

        $scope.$on('queryResult', function (event, data) {
            $scope.queriedVideos = [];
            $scope.queriedVideos = $scope.queriedVideos.concat(data[1]);
            $scope.queryFlag = data[0];
            //clear the videos whenever we get a new query
            $scope.videos = [];
            $scope.startIndex = 0;
        });
        
        $scope.$on('tagFilterUpdate', function () {
            $scope.tagsForQuery = pinTagService.getTags();
            console.log("tags so far" + $scope.tagsForQuery);
        });

        //Generally, we continuously retrieve videos from the database and update locally
        //increment startIndex for database after each load
        $scope.getGeneralVideo = function (startIndex) {
            generalVideoService.getVideos(startIndex).then(
                function (videoArray) {
                    //$scope.updateGeneralVideo(videoArray);
                    $scope.videos = $scope.videos.concat(videoArray);
                    $scope.startIndex += videoConstants.AMOUNT_PER_LOAD;
                    $scope.videosLoaded = true;
                },
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
