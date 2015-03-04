angular.module('videoServices', [])
    .service('generalVideoServices', ['videoConstants', 'generalVideoAjax', function (videoConstants, generalVideoAjax) {
        var _generalVids = [];
        var _mostPinVids = [];
        var _mostViewVids = [];

        var _generalVidBank = [];
        var _mostPinVidBank = [];
        var _mostViewVidBank = [];

        var _generalIndex = 0;
        var _pinIndex = 0;
        var _viewIndex = 0;

        var getVideoBank = function (videoType) {
            switch (videoType) {
                case "general":
                    if (_generalVidBank.length < videoConstants.AMOUNT_PER_BANK_LOAD) {
                        if ((_generalIndex + videoConstants.AMOUNT_PER_BANK_LOAD) <= videoConstants.MAX_VIDEO_COUNT) {
                            update_Gbank();
                        }
                    } 
                    else {
                        _generalVids = _generalVids.concat(_generalVidBank.splice(0, videoConstants.AMOUNT_PER_LOAD));
                    }
                    return _generalVids;

                case "pin": 
                    if (_mostPinVidBank.length < videoConstants.AMOUNT_PER_BANK_LOAD) {
                        if ((_pinIndex + videoConstants.AMOUNT_PER_BANK_LOAD) <= videoConstants.MAX_VIDEO_COUNT) {
                            update_Pbank();
                        }
                    }
                    else {
                        _mostPinVids = _mostPinVids.concat(_mostPinVidBank.splice(0, videoConstants.AMOUNT_PER_LOAD));
                    }
                    return _mostPinVids;

                case "view":
                    if ((_viewIndex + videoConstants.AMOUNT_PER_BANK_LOAD) <= videoConstants.MAX_VIDEO_COUNT) {
                        if (_mostViewVidBank.length < videoConstants.AMOUNT_PER_BANK_LOAD) {
                            update_Vbank();
                        }
                    }
                    else {
                        _mostViewVids = _mostViewVids.concat(_mostViewVidBank.splice(0, videoConstants.AMOUNT_PER_LOAD));
                    }
                    return _mostViewVids;

                default:
                    console.log("error in videoType");
            }
        }
        var update_Gbank = function () {
            console.log("update gbank, index: " + _generalIndex);
            generalVideoAjax.getVideos(_generalIndex).then(
                function (videoArray) {
                    _generalVidBank = _generalVidBank.concat(videoArray);
                    _generalVids = _generalVids.concat(_generalVidBank.splice(0, videoConstants.AMOUNT_PER_LOAD));
                });
            _generalIndex += videoConstants.AMOUNT_PER_BANK_LOAD;
        }
        var update_Pbank = function () {
            generalVideoAjax.getMostPinVideos(_pinIndex).then(
                function (videoArray) {
                    _mostPinVidBank = _mostPinVidBank.concat(videoArray);
                    _mostPinVids = _mostPinVids.concat(_mostPinVidBank.splice(0, videoConstants.AMOUNT_PER_LOAD));
                });
            _pinIndex += videoConstants.AMOUNT_PER_BANK_LOAD;
        }
        var update_Vbank = function () {
            generalVideoAjax.getMostViewVideos(_viewIndex).then(
                function (videoArray) {
                    _mostViewVidBank = _mostViewVidBank.concat(videoArray);
                    _mostViewVids = _mostViewVids.concat(_mostViewVidBank.splice(0, videoConstants.AMOUNT_PER_LOAD));
                });
            _viewIndex += videoConstants.AMOUNT_PER_BANK_LOAD;
        }
    
        var reloadGbank = function () {
            _generalIndex = 0;
            _generalVidBank = [];
            _generalVids = [];
        }
        return {
            getVideoBank: getVideoBank,
            reloadGbank: reloadGbank
        }
    }]);