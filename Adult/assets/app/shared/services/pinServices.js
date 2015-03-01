angular.module('pinServices', [])
    .service('pinVidModal', ['videoConstants', 'localStorageService', 'updateCountAjax',
        function (videoConstants, localStorageService, updateCountAjax) {

        var pinVid = function (BsonId, title, embedHtml) {
            var array = localStorageService.get('pinnedVids') || [];
            array.push({"_id": BsonId, "title": title, "embed": embedHtml });
            localStorageService.set('pinnedVids', array);
            console.log(array);
            //update count, used for Tooltip in modal.html
            localStorageService.set('totalPinnedVideo', (localStorageService.get('totalPinnedVideo') || 0) + 1);
            //update count, for database
            updateCountAjax.updatePinCount(BsonId);
        }

        var startIndex = 0;
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
        var containsPinVideo = function (BsonId) {
            if (BsonId == undefined)
                return "false";
            var array = localStorageService.get('pinnedVids') || [];
            for (var i = 0; i < array.length; i++) {
                if (array[i]._id.localeCompare(BsonId) == 0)
                    return "true";
            }
            return "false"
        }
        var removeInternalPinVideo = function (vid) {
            localStorageService.set('totalPinnedVideo', (localStorageService.get('totalPinnedVideo') || 1) - 1);
            var array = localStorageService.get('pinnedVids') || [];
            if (array.length > 0) {
                var indexToRemove = -1;
                for (var i = 0; i < array.length; i++) {
                    if (array[i]._id.localeCompare(vid._id) == 0) {
                        indexToRemove = i;
                        break;
                    }
                }
                array.splice(indexToRemove, 1);
                localStorageService.set('pinnedVids', array);
            } 
        }
        var removeInternalPinData = function () {
            localStorageService.set('totalPinnedVideo', 0);
            localStorageService.set('pinnedVids', []);
        }
        return {
            pinVid: pinVid,
            getVid: getVid,
            containsPinVideo: containsPinVideo,
            removeInternalPinVideo: removeInternalPinVideo,
            removeInternalPinData: removeInternalPinData
        };
    }]);
  