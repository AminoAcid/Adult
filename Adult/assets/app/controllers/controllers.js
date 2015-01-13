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
                console.log('this is dashbaord' + value);
                $scope.atMainPage = value;
            });


        $scope.$on('subVideoSignal', function (event, vidObj) {
            $scope.atMainPage = false;
            $rootScope.$broadcast('newNavSubVidSignal', vidObj);
        });
    }])
    .controller('SubvideoCtrl', ['$scope', '$rootScope', '$cookieStore', 'keywordVideoService', 'historyService', function ($scope, $rootScope, $cookieStore, keywordVideoService, historyService) {
        $scope.videoData = {};
        $scope.relatedVideos = [];

        $scope.backNavLimited = true;
        $scope.frontNavLimited = true;

            $scope.$watch(
            function () {
                return $cookieStore.get('frontNavLimited');
            },
            function (value) {
                $scope.frontNavLimited = value;
                console.log('frontNavLimited ' + $scope.frontNavLimited)
            });
            $scope.$watch(
                function () {
                    return $cookieStore.get('backNavLimited');
                },
                function (value) {
                    $scope.backNavLimited = value;
                    console.log('backNavLimited ' + $scope.backNavLimited);
                });
        

        $scope.relatedQuery = function () {
            var keywordString = $scope.videoData.maintags.concat($scope.videoData.subtags).join(' ');
            keywordVideoService.getRelatedVideos(keywordString).then(
                function (relatedVideos) {
                    $scope.relatedVideos = $scope.relatedVideos.concat(relatedVideos);
                },
                function () {

                });
        }
        
        $scope.navVideoView = function (vidObj, newNav) {
            //console.log('foward button disabled?');
            //console.log($scope.frontNavLimited);
            //console.log('newnav is ' + newNav);
            if (newNav == false) {
                //console.log(vidObj);
            }
            
            if (vidObj !== undefined) {
                $scope.videoData = vidObj;
                $scope.relatedVideos = [];
                $scope.relatedQuery();
                //From the View, or from this controller.
                if (newNav === undefined || newNav === true) {
                    historyService.newForward(vidObj);
                }
            }
            
        }
        //when you use navButtons
        $scope.$on('navSubVidSignal', function (event, vidObj) {
            //console.log('navSub');
            $scope.navVideoView(vidObj, false);
        });

        //when you click on a new video
        $scope.$on('newNavSubVidSignal', function (event, vidObj) {
            //console.log('new-navsub');
            $scope.navVideoView(vidObj, true);
        });


        $scope.pinVideo = function (title, embedHtml) {
            pinVidModal.pinVid(title, embedHtml);
        }

    }])
    .controller('NavCtrl', ['$scope', 'historyService', function ($scope, historyService) {
        $scope.isFoward = undefined;

        $scope.navSubVideoSignal = function (vidObj) {
            $scope.$emit('navSubVidSignal', vidObj);
        }

        $scope.navigate = function () {
            //console.log('isfoward boolean ' + $scope.isFoward);
            if ($scope.isFoward) {
                $scope.navSubVideoSignal(historyService.forward());
            } else if ($scope.isFoward === false) {     
                $scope.navSubVideoSignal(historyService.backward());
            } else {
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
            //console.log($scope.queriedVideos.length);
            $rootScope.$broadcast('queryResult', [true, $scope.queriedVideos]);
        }

        
        
      
    }])
    .controller('VideoCtrl', ['$scope', '$rootScope', 'localStorageService', 'generalVideoService', 'videoConstants', 'pinVidModal', 'pinTagService',
        function ($scope, $rootScope, localStorageService, generalVideoService, videoConstants, pinVidModal, pinTagService) {

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
            //console.log('gen vid: ' + $scope.videos.length);
            //console.log('query vid: ' + $scope.queriedVideos.length);
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

        $scope.signalSubVideo = function (vid) {
            $scope.$emit('subVideoSignal', vid);
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
            console.log("getpinnedvideos hit " + $scope.pinnedVideos.length);
            console.log($scope.pinnedVideos);
        }
        
    }]);
