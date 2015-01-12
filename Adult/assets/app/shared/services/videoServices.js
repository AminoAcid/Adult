angular.module('videoServices', [])
    .service('keywordVideoService', ['$http', '$q', function ($http, $q) {
        var getQueryVideos = function (keywordString) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/queryget/' + keywordString 
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
        var getRelatedVideos = function (keywordString) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/relatedget/' + keywordString
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
        return {
            getQueryVideos: getQueryVideos,
            getRelatedVideos: getRelatedVideos
        };
    }])
    .factory('generalVideoService', ['$http', '$q', function ($http, $q) {
        return {
            getVideos: function (startIndex) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/Video/get/' + startIndex
                }).success(deferred.resolve).error(deferred.reject);
                return deferred.promise;
            }
        };
    }])
    .service('historyService', ['$cookieStore', function ($cookieStore) {
        var newForward = function (vid) {
            $cookieStore.put('index', ($cookieStore.get('index') || 0) + 1);
            console.log('index is: '+ $cookieStore.get('index'));

            var browseHistory = $cookieStore.get('browseHistory') || [];
            var pageNumber = $cookieStore.get('index') || 0;
            
            if (browseHistory.length >= pageNumber) {
                browseHistory.splice(pageNumber, browseHistory.length - pageNumber, vid);
                console.log('special new foward');
            } else {
                browseHistory.push(vid);
                console.log('regular newfoward');
            }
            
            console.log(browseHistory);
            $cookieStore.put('browseHistory', browseHistory);
        }
        var forward = function () {
            console.log('new foward');
            $cookieStore.put('index', ($cookieStore.get('index') || 0) + 1);
            console.log('index is ' + $cookieStore.get('index'));
            var pageNumber = $cookieStore.get('index') || 0;
            var browseHistory = $cookieStore.get('browseHistory') || [];
            if (pageNumber < browseHistory.length) {
                return browseHistory[pageNumber];
            } else {
                return {};
            }
        }
        var backward = function()
        {
            $cookieStore.put('index', ($cookieStore.get('index') || 1) - 1);
            var pageNumber = $cookieStore.get('index');
            console.log('index is ' + pageNumber);
            if (pageNumber > 0) {
                var browseHistory = $cookieStore.get('browseHistory');
                console.log('backwards object');
                console.log(browseHistory[pageNumber]);
                return browseHistory[pageNumber - 1];
            } else {
                console.log('we are returning nothing back');
                return {};
            }
        }
        return {
            newForward: newForward,
            forward: forward,
            backward: backward
        };
    }]);