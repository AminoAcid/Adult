"use strict";
angular.module('controllers', [])
    .run(['$cookieStore', 'localStorageService', function ($cookieStore, localStorageService) {
        //localStorageService.clearAll();
        //$cookieStore.remove('pageNumber');
        //$cookieStore.remove('browseHistory');
        //$cookieStore.remove('frontNavLimited');
        //$cookieStore.remove('atMainPage');
        //$cookieStore.remove('backNavLimited');
        $cookieStore.remove('numberOfRelatedVideos');
        $cookieStore.remove('relatedVids');
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
    .controller('DashboardCtrl', ['$scope', '$rootScope', '$cookieStore', 'routeConstants',
        function ($scope, $rootScope, $cookieStore, routeConstants) {
            //GET ROUTE
            $cookieStore.put('route', routeConstants.MAINPAGE);
            $scope.route = routeConstants.MAINPAGE;
            $scope.$watch(
                function () {
                    return $cookieStore.get('route');
                },
                function (value) {
                    $scope.route = value;
                });
            $scope.atMainPage = function () { return $scope.route.localeCompare(routeConstants.MAINPAGE) == 0; }
            $scope.atSubPage = function () { return $scope.route.localeCompare(routeConstants.SUBPAGE) == 0; }
            $scope.atRelatedPage = function () { return $scope.route.localeCompare(routeConstants.RELATED) == 0;}
            //NAVIAGATION BUTTONS
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
                    }
                });

            $scope.mostPinNavTab = function () {
                $rootScope.$broadcast('MostPinNavTab');
            }

            $scope.mostViewNavTab = function () {
                $rootScope.$broadcast('MostViewNavTab');
            }

            $scope.goToRelated = function () {
                $cookieStore.put('route', routeConstants.RELATED);
            }

            $scope.goToMain = function () {
                $cookieStore.put('route', routeConstants.MAINPAGE);
            }
        }])
    .controller('SubVideoCtrl', ['$scope', '$rootScope', '$cookieStore', 'keywordVideoAjax', 'historyService', 'updateCountAjax',
        function ($scope, $rootScope, $cookieStore, keywordVideoAjax, historyService, updateCountAjax) {
            $scope.videoData = {};
            $scope.relatedVideos = [];

            $scope.relatedQuery = function () {
                var keywordString = $scope.videoData.maintags.concat($scope.videoData.subtags).join(' ');
                keywordVideoAjax.getRelatedVideos(keywordString).then(
                    function (relatedVideos) {
                        //remove duplicate as the most related video, is the video itself
                        var index = relatedVideos.indexOf($scope.videoData);
                        relatedVideos.splice(index, 1);
                        $scope.relatedVideos = $scope.relatedVideos.concat(relatedVideos);
                    },
                    function () {

                    });
            }

            $scope.navVideoView = function (vidObj, isNewNav) {
                if (vidObj != null) {
                    //update ViewCount
                    updateCountAjax.updateViewCount(vidObj._id);
                    $scope.videoData = vidObj;
                    $scope.relatedVideos = [];
                    $scope.relatedQuery();
                    if (isNewNav) {
                        historyService.newForward(vidObj);
                    }
                }
                //else, no object was returned which means we're going back to main page
            }
            //isNewNav - navigation not caused by navigation buttons
            $scope.$on('navSubVidSignal', function (event, subVidData) {
                $scope.navVideoView(subVidData.vidObj, subVidData.isNewNav);
            });
        }])
    .controller('NavCtrl', ['$scope', '$cookieStore', 'historyService', function ($scope, $cookieStore, historyService) {
        //Defines whether the button attribute is a foward or backward button
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
    .controller('CategoryCtrl', ['$scope', 'getCategoryAjax', function ($scope, getCategoryAjax) {
        $scope.popularTags = [];
        $scope.getPopularTags = function () {
            getCategoryAjax.getTags().then(
                function (Tags) {
                    $scope.popularTags = $scope.popularTags.concat(Tags.popularTags);
                },
                function () {

                });
        }
    }])
    .controller('CategoryBtnCtrl', ['$scope', 'pinTagService', '$rootScope', function ($scope, pinTagService, $rootScope) {
        $scope.pressed = "false";

        $scope.bindTagForFilter = function (tag) {
            //for CSS
            if ($scope.pressed.localeCompare("false") == 0) {
                $scope.pressed = "true";
            }
            else {
                $scope.pressed = "false";
            }
            //this service handles removal.
            pinTagService.addTag(tag);
        }
    }])
    .controller('SearchCtrl', ['$scope', '$rootScope', '$cookieStore', 'keywordVideoAjax', 'historyService',
        function ($scope, $rootScope, $cookieStore, keywordVideoAjax, historyService) {
            $scope.queriedVideos = [];

            $scope.keywordQuery = function (keywords) {
                if (keywords === undefined || keywords.localeCompare('') == 0) {
                    $rootScope.$broadcast('reloadGeneralVideos');
                }
                else {
                    keywordVideoAjax.getQueryVideos(keywords)
                        .then(
                        function (searchResults) {
                            $scope.queriedVideos = [];
                            $scope.queriedVideos = $scope.queriedVideos.concat(searchResults);
                            $rootScope.$broadcast('queryResult', { queriedVideos: $scope.queriedVideos });
                            historyService.navToMainPage();
                        });
                }
            }
        }])
    .controller('VideoCtrl', ['$scope', '$rootScope', '$cookieStore', 'localStorageService', 'generalVideoAjax', 'videoConstants', 'pinVidModal', 'pinTagService', 'routeConstants',
        function ($scope, $rootScope, $cookieStore, localStorageService, generalVideoAjax, videoConstants, pinVidModal, pinTagService, routeConstants) {

            var queryFlag = false;
            $scope.queriedVideos = [];
            var currentIndex = 0;
            $scope.videos = [];
            $scope.tagsForQuery = [];
            var videoType = "general";

            //Generally, we continuously retrieve videos from the database and update
            //increment startIndex for database after each load
            $scope.getGeneralVideo = function (startIndex) {
                switch (videoType) {
                    case "general":
                        currentIndex += videoConstants.AMOUNT_PER_LOAD;
                        generalVideoAjax.getVideos(startIndex).then(
                            function (videoArray) {
                                $scope.videos = $scope.videos.concat(videoArray);
                                console.log("general hit");
                            });
                        break;
                    case "pin":
                        currentIndex += videoConstants.AMOUNT_PER_LOAD;
                        generalVideoAjax.getMostPinVideos(startIndex).then(
                            function (videoArray) {
                                $scope.videos = $scope.videos.concat(videoArray);
                                console.log("pin hit");
                            });
                        break;
                    case "view":
                        currentIndex += videoConstants.AMOUNT_PER_LOAD;
                        generalVideoAjax.getMostViewVideos(startIndex).then(
                            function (videoArray) {
                                $scope.videos = $scope.videos.concat(videoArray);
                                console.log("view hit");
                            });
                        break;
                    default:
                        console.log("error in videoType");
                }

            }
            //Upon Query, we recieve a broadcast, and recieve the entire array of videos, and we update accordingly
            $scope.getQueryVideos = function () {
                $scope.videos = $scope.videos.concat($scope.queriedVideos.splice(0, videoConstants.AMOUNT_PER_LOAD));
            }

            $scope.getVideos = function () {
                if (currentIndex <= videoConstants.MAX_VIDEO_COUNT) {
                    console.log("current index is: " + currentIndex);
                    if (queryFlag) {
                        $scope.getQueryVideos();
                    }
                    else {
                        $scope.getGeneralVideo(currentIndex);
                    }
                }
                console.log('getvideo is hit for infinitescroll');
            }

            //if a video was clicked on the main page
            $scope.signalSubVideo = function (vidObject) {
                $cookieStore.put('route', routeConstants.SUBPAGE);
                $scope.$emit('navSubVidSignal', { vidObj: vidObject, isNewNav: true });
            }

            $scope.$on('queryResult', function (event, queryData) {
                $scope.queriedVideos = [];
                $scope.queriedVideos = $scope.queriedVideos.concat(queryData.queriedVideos);
                //when we have a query, show queried videos, not main videos
                queryFlag = true;
                //clear the videos whenever we get a new query
                $scope.videos = [];
                currentIndex = 0;
                //initalize inital show of query videos
                $scope.getQueryVideos();
            });

            //when enter an empty string on search, reload.
            $scope.$on('reloadGeneralVideos', function (event) {
                queryFlag = false;
                currentIndex = 0;
                $scope.videos = [];
                videoType = "general";
                $scope.getGeneralVideo(currentIndex);
            });

            $scope.$on('MostPinNavTab', function (event) {
                //create cookie to unactivate the navtab
                queryFlag = false;
                currentIndex = 0;
                $scope.videos = [];
                $scope.queriedVideos = [];
                videoType = "pin";
                $scope.getGeneralVideo(currentIndex);
            });

            $scope.$on('MostViewNavTab', function (event) {
                //cookie to unactivate the navtab
                queryFlag = false;
                currentIndex = 0;
                $scope.videos = [];
                $scope.queriedVideos = [];
                videoType = "view";
                $scope.getGeneralVideo(currentIndex);
            })

            //updates tag filter
            $scope.$watchCollection(
            function () {
                return pinTagService.getTags();
            },
            function (newVal, oldVal) {
                $scope.tagsForQuery = newVal;
            });
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
        }

        $scope.removePinVideo = function (vid) {
            //local
            var indexToRemove = $scope.pinnedVideos.indexOf(vid);
            $scope.pinnedVideos.splice(indexToRemove, 1);
            //global
            pinVidModal.removeInternalPinVideo(vid);
        }

        $scope.removeAllPinVideo = function () {
            //local
            $scope.pinnedVideos = [];
            //global
            pinVidModal.removeInternalPinData();
        }

        $scope.$on('unpin', function (event, vid) {
            $scope.removePinVideo(vid);
        });
    }])
    .controller('PinCtrl', ['$scope', 'localStorageService', 'generalVideoAjax', 'pinVidModal',
        //determine which pinButton to show
        function ($scope, localStorageService, generalVideoAjax, pinVidModal) {
            $scope.$watch(
                function () {
                    return (localStorageService.get('pinnedVids') || []).length;
                },
                function () {
                    $scope.containPinVid = pinVidModal.containsPinVideo($scope.videobsonid);
                });

            $scope.pinVideo = function () {
                pinVidModal.pinVid($scope.videobsonid, $scope.title, $scope.embed);
            }

            $scope.unPinVideo = function () {
                var vid = { "_id": $scope.videobsonid };
                $scope.$emit('unpin', vid);
            }
        }])
    .controller('RelatedCtrl', ['$scope', 'relatedService', '$cookieStore', 'videoConstants', 'routeConstants', function ($scope, relatedService, $cookieStore, videoConstants, routeConstants) {
        //$scope.relatedVids = [];
        $scope.relatedVids = relatedService.getRelatedVids();
        $scope.hasRelatedVideos = function () {
            return $scope.numberOfRelatedVideos > 0;
        }

        $scope.numberOfRelatedVideos = 0;
        $scope.$watch(
            function () {
                return $cookieStore.get('numberOfRelatedVideos') || 0;
            },
            function (value) {
                $scope.numberOfRelatedVideos = value;

        });
        $scope.load = function () {
            $scope.relatedVids = relatedService.getRelatedVids();
        }
        
        $scope.getRelatedVideos = function () {
            console.log("ng-infinite hit");
            //if ($scope.numberOfRelatedVideos > $scope.relatedVids.length) {
            //    $scope.relatedVids = $scope.relatedVids.concat(relatedService.getRelatedVids());
            //            debugger;
            //}
        }

        $scope.removeFromRelated = function (vidObj) {
            relatedService.removeRelatedVid(vidObj);
        }
        
        //if a video was clicked, go to submain
        $scope.signalSubVideo = function (vidObject) {
            $cookieStore.put('route', routeConstants.SUBPAGE);
            $scope.$emit('navSubVidSignal', { vidObj: vidObject, isNewNav: true });
        }
    }])
    .controller('RelatedBtnCtrl', ['$scope', 'relatedService', function ($scope, relatedService) {
        $scope.addToRelated = function () {
            relatedService.addRelatedVid($scope.bsonid);
        }
    }]);