angular.module('pinServices', [])
    .service('pinVidModal', ['videoConstants', function (videoConstants) {
        var pinnedVids = [];
        var pinVid = function (title, embedHtml) {
            pinnedVids.push({ "title": title, "embed": embedHtml });
        }
        var getVid = function () {
            var array = pinnedVids.splice(0, videoConstants.AMOUNT_PER_LOAD);
            var videos = [];
            var length = (array.length < videoConstants.AMOUNT_PER_LOAD) ? array.length : videoConstants.AMOUNT_PER_LOAD;
            for (var i = 0; i < length; i++) {
                videos.push(array[i]);
            }
            return videos;
        }
        var getSize = function () {
            return pinnedVids.length;
        }
        return {
            pinVid: pinVid,
            getVid: getVid,
            getSize: getSize
        };
    }]);
    //.factory('pinVidModal', ['videoModalBootstrap', function (videoModalBootstrap) {
    //    pinnedVids = [];
    //    pinVidModalOperator = {
    //        resetPinnedVids: function () {
    //            pinnedVids = [];
    //        },
    //        //Gets BsonId
    //        setPinVid: function (BsonId) {
    //            pinnedVids.push(BsonId);
    //        },
    //        //Returns EmbedHtml[] from BsonId[]
    //        getPinVids: function () {
    //            videoModalBootstrap.getEmbed(pinnedVids).then(
    //                //success
    //                function (embedHtmlArray) {
    //                    $scope.resetPinnedVids();
    //                    return embedHtmlArray;
    //                },
    //                //failure
    //                function () {

    //                });
    //        }
    //    }
    //    return pinVidModalOperator;
    //}]);