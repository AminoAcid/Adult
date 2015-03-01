angular.module('pagingServices', [])
    .service('pageState', ['$cookieStore', 'routeConstants', function ($cookieStore, routeConstants) {
        //0 is main page, 1 - n is submain pages
       
        var newForwardState = function () {
            $cookieStore.put('frontNavLimited', true);
            $cookieStore.put('backNavLimited', false);
            $cookieStore.put('route', routeConstants.SUBPAGE);
            $cookieStore.put('pageNumber', ($cookieStore.get('pageNumber') || 0) + 1);
        }

        var forwardState = function () {
            $cookieStore.put('pageNumber', $cookieStore.get('pageNumber') + 1);
            var pageNumber = ($cookieStore.get('pageNumber'));
            var browseHistory = $cookieStore.get('browseHistory');
 
            $cookieStore.put('backNavLimited', false);
            $cookieStore.put('route', routeConstants.SUBPAGE);
            $cookieStore.put('pageNumber', pageNumber);
            if (pageNumber < browseHistory.length) {
                $cookieStore.put('frontNavLimited', false);
            } else if (pageNumber === browseHistory.length) {
                $cookieStore.put('frontNavLimited', true);
            } 
            else {
                console.log("error, bad page number");
            }
        }
        var backwardState = function () {
            $cookieStore.put('pageNumber', $cookieStore.get('pageNumber') - 1);
            var pageNumber = $cookieStore.get('pageNumber');
            var browseHistory = $cookieStore.get('browseHistory');
            if (pageNumber > 0) {
                $cookieStore.put('frontNavLimited', false);
                $cookieStore.put('backNavLimited', false);
            } else {
                $cookieStore.put('backNavLimited', true);
                $cookieStore.put('route', routeConstants.MAINPAGE);
                if (browseHistory.length > 0) {
                    $cookieStore.put('frontNavLimited', false);
                }
            }
            console.log(pageNumber);
        }
        var mainPageState = function () {
            $cookieStore.put('frontNavLimited', false);
            $cookieStore.put('backNavLimited', true);
            $cookieStore.put('pageNumber', 0);
            $cookieStore.put('route', routeConstants.MAINPAGE);
        }
        return {
            newForwardState: newForwardState,
            forwardState: forwardState,
            backwardState: backwardState,
            mainPageState: mainPageState
        }
    }])