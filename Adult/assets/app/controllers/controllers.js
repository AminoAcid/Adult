angular.module('controllers', [])
    .run(['$cookieStore', 'localStorageService', function ($cookieStore, localStorageService) {
        //localStorageService.clearAll();  
        //$cookieStore.remove('pageNumber');
        //$cookieStore.remove('browseHistory');
        //$cookieStore.remove('frontNavLimited');
        //$cookieStore.remove('atMainPage');
        //$cookieStore.remove('backNavLimited');
        //$cookieStore.get('currentVideo');
        //for testing, uncomment this to clear storage/cookies
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
    .controller('DashboardCtrl', ['$scope', '$rootScope', '$cookieStore', function ($scope, $rootScope, $cookieStore) {
        $cookieStore.put('atMainPage', true);
        $scope.atMainPage = true;
        $scope.$watch(
            function () {
                return $cookieStore.get('atMainPage');
            },
            function (value) {
                $scope.atMainPage = value;
        });

        $scope.backNavLimited = true;
        $scope.frontNavLimited = true;
        $scope.$watch(
            function () {
                return $cookieStore.get('frontNavLimited');
            },
            function (value) {
                if (value !== undefined) {
                    $scope.frontNavLimited = value;
                }
        });
        $scope.$watch(
            function () {
                return $cookieStore.get('backNavLimited');
            },
            function (value) {
                if (value !== undefined) {
                    $scope.backNavLimited = value;
                    //console.log('backNavLimited ' + $scope.backNavLimited);
                }
            });

        $scope.$on('subVideoSignal', function (event, subVidData) {
            $scope.atMainPage = false;
            $rootScope.$broadcast('navSubVidSignal', subVidData);
        });
    }])
    .controller('SubvideoCtrl', ['$scope', '$rootScope', '$cookieStore', 'keywordVideoService', 'historyService', 'updateCount',
        function ($scope, $rootScope, $cookieStore, keywordVideoService, historyService, updateCount) {
        $scope.videoData = {};
        $scope.relatedVideos = [];

        $scope.relatedQuery = function () {
            var keywordString = $scope.videoData.maintags.concat($scope.videoData.subtags).join(' ');
            keywordVideoService.getRelatedVideos(keywordString).then(
                function (relatedVideos) {
                    var index = relatedVideos.indexOf($scope.videoData);
                    $scope.relatedVideos = $scope.relatedVideos.concat(relatedVideos.splice(index , 1));
                },
                function () {

                });
        }
        
        $scope.navVideoView = function (vidObj, isNewNav) {
            if (vidObj != null) {
                console.log(typeof vidObj._id);
                updateCount.updateViewCount(vidObj._id);
                $scope.videoData = vidObj;
                $scope.relatedVideos = [];
                $scope.relatedQuery();
                if (isNewNav) {
                    historyService.newForward(vidObj);
                }
            }
            //else, we're going back to main page
        }
        //isNewNav - navigation not caused by navigation buttons
        $scope.$on('navSubVidSignal', function (event, subVidData) {
            $scope.navVideoView(subVidData.vidObj, subVidData.isNewNav);
        });

        $scope.pinVideo = function (title, embedHtml) {
            pinVidModal.pinVid(title, embedHtml);
        }

    }])
    .controller('NavCtrl', ['$scope', '$cookieStore', 'historyService', function ($scope, $cookieStore, historyService) {
        $scope.isFoward = undefined;

        $scope.navigate = function () {
            if ($scope.isFoward) {
                historyService.forward().then(function (obj) {
                    $scope.$emit('navSubVidSignal', { vidObj: obj, isNewNav: false });
                });
            }
            else if ($scope.isFoward === false) {
                var promise = historyService.backward();
                if (promise !== null) {
                    promise.then(function (obj) {
                        $scope.$emit('navSubVidSignal', { vidObj: obj, isNewNav: false });
                    });
                }
            }
            else {
                console.log('uninitalized attributes');
            }
        }
        
    }])
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
        $scope.queriedVideos = [];

        $scope.keywordQuery = function (keywords) {
            keywordVideoService.getQueryVideos(keywords).then(
                function (searchResults) {
                    $scope.queriedVideos = [];
                    $scope.queriedVideos = $scope.queriedVideos.concat(searchResults);
                },
                function () {
                });
            $rootScope.$broadcast('queryResult', [true, $scope.queriedVideos]);
        }
    }])
    .controller('VideoCtrl', ['$scope', '$rootScope', '$cookieStore', 'localStorageService', 'generalVideoService', 'videoConstants', 'pinVidModal', 'pinTagService',
        function ($scope, $rootScope, $cookieStore, localStorageService, generalVideoService, videoConstants, pinVidModal, pinTagService) {

        var queryFlag = false;
        $scope.queriedVideos = [];
        var currentIndex = 0;
        $scope.videos = [];
        $scope.tagsForQuery = [];
        $scope.videosLoaded = false;
       
        $scope.$on('queryResult', function (event, data) {
            $scope.queriedVideos = [];
            $scope.queriedVideos = $scope.queriedVideos.concat(data[1]);
            //when we have a query, show queried videos, not main videos
            queryFlag = data[0];
            //clear the videos whenever we get a new query
            $scope.videos = [];
            currentIndex = 0;
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
                    currentIndex += videoConstants.AMOUNT_PER_LOAD;
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
            if (queryFlag) {
                $scope.getQueryVideo();
            }
            else {
                $scope.getGeneralVideo(currentIndex);
            }
        }

        $scope.pinVideo = function (title, embedHtml) {
            pinVidModal.pinVid(title, embedHtml);
        }
        //if a video was clicked on the main page
        $scope.signalSubVideo = function (vidObject) {
            $scope.$emit('subVideoSignal', {vidObj: vidObject, isNewNav: true});
        }

    }])
    .controller('ModalCtrl', ['$scope', 'pinVidModal', 'localStorageService', function ($scope, pinVidModal, localStorageService) {
        $scope.$watch(
            function () {
                return localStorageService.get('totalPinnedVideo') || 0;
            },
            function (value) {
                $scope.numberOfPinnedVideos = value;
        });

        $scope.pinnedVideos = [];
        $scope.getPinnedVideos = function () {
            $scope.pinnedVideos = $scope.pinnedVideos.concat(pinVidModal.getVid());
            //console.log("getpinnedvideos hit " + $scope.pinnedVideos.length);
            //console.log($scope.pinnedVideos);
        }
        
        $scope.removePinVideo = function (vid) {
            //local
            var indexToRemove = $scope.pinnedVideos.indexOf(vid);
            $scope.pinnedVideos.splice(indexToRemove, 1);
            //global
            pinVidModal.removeInternalPinVideo();
        }

        $scope.removeAllPinVideo = function () {
            //local
            $scope.pinnedVideos = [];
            //global
            pinVidModal.removeInternalPinData();
        }
    }]);
