angular.module('pinServices', ['ngCookies'])
    .service('pinVidModal', ['videoConstants', 'localStorageService', function (videoConstants, localStorageService) {
        var startIndex = 0;

        var pinVid = function (title, embedHtml) {
            var array = localStorageService.get('pinnedVids') || [];
            array.push({ "title": title, "embed": embedHtml });
            localStorageService.set('pinnedVids', array);
            //update count, used for Tooltip in modal.html
            localStorageService.set('totalPinnedVideo', (localStorageService.get('totalPinnedVideo') || 0) + 1);
        }

        var getVid = function () {
            var videos = [];
            var array = localStorageService.get('pinnedVids') || [];
            if (array.length != 0) {
                var length = (array.length < startIndex + videoConstants.AMOUNT_PER_LOAD) ? array.length : videoConstants.AMOUNT_PER_LOAD + startIndex;
                for (var i = startIndex; i < length; i++) {
                    videos.push(array[i]);
                }
                if(length != 0)
                    startIndex = length;
            }
            return videos;
        }
        var removeInternalPinVideo = function (vid) {
            localStorageService.set('totalPinnedVideo', (localStorageService.get('totalPinnedVideo') || 1) - 1);
            var array = localStorageService.get('pinnedVids') || [];
            if (array.length > 0) {
                var indexToRemove = array.indexOf(vid);
                array.splice(indexToRemove, 1);
            }
            localStorageService.set('pinnedVids', array);
        }
        var removeInternalPinData = function () {
            localStorageService.set('totalPinnedVideo', 0);
            localStorageService.set('pinnedVids', []);
        }
        return {
            pinVid: pinVid,
            getVid: getVid,
            removeInternalPinVideo: removeInternalPinVideo,
            removeInternalPinData: removeInternalPinData
        };
    }]);
  