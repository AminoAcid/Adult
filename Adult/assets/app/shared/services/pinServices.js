angular.module('pinServices', ['ngCookies'])
    .service('pinVidModal', ['videoConstants', 'localStorageService', function (videoConstants, localStorageService) {
        var startIndex = 0;

        var pinVid = function (title, embedHtml) {
            var array = localStorageService.get('pinnedVids') || [];
            array.push({ "title": title, "embed": embedHtml });
            localStorageService.set('pinnedVids', array);
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
        return {
            pinVid: pinVid,
            getVid: getVid
        };
    }]);
  