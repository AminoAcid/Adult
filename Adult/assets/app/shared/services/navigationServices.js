angular.module('navigationServices', [])
    .service('historyService', ['$cookieStore', 'pageState', 'generalVideoService', function ($cookieStore, pageState, generalVideoService) {
        var newForward = function (vid) {
            pageState.newForwardState();

            var browseHistory = $cookieStore.get('browseHistory') || [];
            var pageNumber = $cookieStore.get('pageNumber');
            
            if (browseHistory.length >= pageNumber) {
                //BrowseHistoryIndex = pageNumber-1     
                //pageNumber 1 - 1 ratio with browseHistory.length, therefore, add ensure atleast 1 subtraction
                browseHistory.splice(pageNumber-1, browseHistory.length+1 - pageNumber, vid._id);
            } else {
                browseHistory.push(vid._id);
            }
            console.log(browseHistory);
            //console.log(pageNumber);
            $cookieStore.put('browseHistory', browseHistory);
        }
        var forward = function () {
            pageState.forwardState();

            var pageNumber = $cookieStore.get('pageNumber');
            var browseHistory = $cookieStore.get('browseHistory');

            
            return generalVideoService.getUniqueVideo(browseHistory[pageNumber - 1]).then(
                function (vidObj) {
                    //$cookieStore.put('currentVideo', vidObj);
                    return vidObj;
                    //console.log('forward ajax ' + vidObj.title + 'id: ' + browseHistory[pageNumber - 1]);
                },
                function () {
                    console.log("failed ajax call of getUniqueVideo");
                });
            //console.log('size:' + browseHistory.length + 'foward:' + (pageNumber - 1) + ': ' + $cookieStore.get('currentVideo').title);
            // return $cookieStore.get('currentVideo');
                
            
        }
        var backward = function() {
            pageState.backwardState();

            var pageNumber = $cookieStore.get('pageNumber');
            if (pageNumber > 0) {
                var browseHistory = $cookieStore.get('browseHistory');
                return generalVideoService.getUniqueVideo(browseHistory[pageNumber - 1]).then(
                    function (vidObj) {
                        //$cookieStore.put('currentVideo', vidObj);
                        return vidObj;
                        console.log('backward ajax ' + vidObj.title + 'id: ' + browseHistory[pageNumber - 1]);
                    },
                    function () {
                        console.log("failed ajax call of getUniqueVideo");
                    });

                //console.log('size:' + browseHistory.length + ' backward: ' + (pageNumber-1) + ': ' + $cookieStore.get('currentVideo').title);
                //return $cookieStore.get('currentVideo');
            } else {
                return null;
            }
        }
        return {
            newForward: newForward,
            forward: forward,
            backward: backward
        };
    }]);