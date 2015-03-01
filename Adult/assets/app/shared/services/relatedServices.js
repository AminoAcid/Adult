angular.module('relatedServices', [])
    .service('relatedService', ['$cookieStore', 'keywordVideoService', 'videoConstants', 'generalVideoService', 'videoConstants',
        function ($cookieStore, keywordVideoService, videoConstants, generalVideoService, videoConstants) {

            var _relatedVids = [];
            var _startIndex = 0;

            var addRelatedVid = function (bsonId) {
                var relatedVids_id = $cookieStore.get('relatedVids') || [];
                //Retrieve the source_video
                generalVideoService.getUniqueVideo(bsonId).then(
                function (vidObj) {
                    //Retrieve videos related to source_video
                    var keywordString = vidObj.maintags.concat(vidObj.subtags).join(' ');
                    keywordVideoService.getRelatedVideos(keywordString).then(
                        function (relatedVidObjs) {
                            //remove duplicates from pre-existing related videos in Cookie memory
                            for (var i = 0; i < relatedVidObjs.length; i++) {
                                for (var j = 0; j < relatedVids_id.length; j++) {
                                    if (relatedVidObjs[i]._id.localeCompare(relatedVids_id[j]) == 0) {
                                        relatedVidObjs.splice(i, 1);
                                    }
                                }
                            }
                            //add Related Videos to Cookie memory and Application memory
                            for (i = 0; i < relatedVidObjs.length; i++) {
                                //Cookie memory
                                relatedVids_id.push(relatedVidObjs[i]._id);
                                //Application memory
                                generalVideoService.getUniqueVideo(relatedVidObjs[i]._id).then(
                                    function (vidObj) {
                                        _relatedVids.push(vidObj);
                                        $cookieStore.put('numberOfRelatedVideos', relatedVids_id.length);
                                    });
                            }
                            $cookieStore.put('relatedVids', relatedVids_id);
                        },
                        function () {
                            console.log('failed getRelatedVideos ajax call');
                        });
                }, function () {
                    console.log('failed getUniqueVideo ajax call');
                });
            }

            var removeRelatedVid = function (vidObj) {
                var relatedVids_id = $cookieStore.get('relatedVids') || [];
                if (relatedVids_id.length > 0) {
                    var indexToRemove = -1;
                    for (var i = 0; i < relatedVids_id.length; i++) {
                        if (relatedVids_id[i].localeCompare(vidObj._id) == 0) {
                            indexToRemove = i;
                            break;
                        }
                    }
                    relatedVids_id.splice(indexToRemove, 1);
                    $cookieStore.put('numberOfRelatedVideos', relatedVids_id.length);
                    $cookieStore.put('relatedVids', relatedVids_id);
                }
            }

            var getRelatedVids = function () {
                //var tempRelatedVids = [];
                var relatedVids_id = $cookieStore.get('relatedVids') || [];
                //Ensure Cookie memory == Application memory
                memoryCheck(relatedVids_id, _relatedVids);
                console.log('GET RELATED VIDS CHECK');
                return _relatedVids;
                //if (_relatedVids.length != 0) {
                //    var length = (_relatedVids.length < _startIndex + videoConstants.AMOUNT_PER_LOAD) ? _relatedVids.length : _startIndex + videoConstants.AMOUNT_PER_LOAD;
                //    for (var i = _startIndex; i < length; i++) {
                //        tempRelatedVids.push(_relatedVids[i]);
                //    }
                //    //update _startIndex
                //    _startIndex = length;
                //}
                //debugger;
                //return tempRelatedVids;
            }

            var memoryCheck = function (cookieMemArr, appMemArr) {
                var bsonIds = [];
                if (cookieMemArr.length > appMemArr.length) {
                    for (var i = 0; i < cookieMemArr.length; i++) {
                        if (cookieMemArr.contains(appMemArr[i]._id)) {
                            cookieMemArr.splice(i, 1);
                            i--;
                        }
                    }
                    for (var j = 0; j < cookieMemArr.length; j++) {
                        generalVideoService.getUniqueVideo(cookieMemArr[j]).then(
                            function (vidObj) {
                                appMemArr.push(vidObj);
                            },
                            function () {
                                console.log('failed getUniqueVideo ajax call');
                            });
                    }
                }
                else if (appMemArr.length > cookieMemArr.length && cookieMemArr.length > 0) {
                    console.log('Memory consistency error');
                }
            }
            return {
                addRelatedVid: addRelatedVid,
                removeRelatedVid: removeRelatedVid,
                getRelatedVids: getRelatedVids
            };
        }]);