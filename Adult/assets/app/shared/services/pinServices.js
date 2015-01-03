angular.module('pinServices', ['ngCookies'])
    .service('pinVidModal', ['videoConstants', 'localStorageService', function (videoConstants, localStorageService) {
        localStorageService.clearAll();
 
        var startIndex = 0;

        var pinVid = function (title, embedHtml) {
            //pinnedVids.push({ "title": title, "embed": embedHtml });
            //$cookies.pinnedVidsCookie = [];
            //var array = localStorage.getItem('pinnedVids') || [];
            
            var array = localStorageService.get('pinnedVids') || [];
            //var array = new Array();
            //console.log(array);
            //console.log("type of "+ typeof array);
            //console.log("does it equal array?" + array.constructor === Array);
            //console.log("instance of " + array instanceof Array);
            
            array.push({ "title": title, "embed": embedHtml });
            console.log('from add ' + array);
            localStorageService.set('pinnedVids', array);
            //localStorage.setItem('pinnedVids', array);
        }

        var getVid = function () {
            //var array = pinnedVids.splice(0, videoConstants.AMOUNT_PER_LOAD);
            var videos = [];
            //var length = (array.length < videoConstants.AMOUNT_PER_LOAD) ? array.length : videoConstants.AMOUNT_PER_LOAD;
            var array = localStorageService.get('pinnedVids') || [];
            console.log('from getVid ' + array);
            console.log(array);
            if (array.length == 0) { return []; }
            else {
                var length = (array.length < startIndex + videoConstants.AMOUNT_PER_LOAD) ? array.length : videoConstants.AMOUNT_PER_LOAD + startIndex;
                console.log('length of total videos' + length);
                for (var i = startIndex; i < length; i++) {
                    videos.push(array[i]);
                }
                if(length != 0)
                    startIndex = length;
                return videos;
            }
        }
        return {
            pinVid: pinVid,
            getVid: getVid
        };
    }]);
  