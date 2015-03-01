angular.module('constants', [])
    .constant('videoConstants', {
        AMOUNT_PER_LOAD: 4,
        MAX_VIDEO_COUNT: 8,
    })
    .constant('routeConstants', {
        MAINPAGE: 'mainvideos',
        SUBPAGE: 'subvideo',
        RELATED: 'related'
    });