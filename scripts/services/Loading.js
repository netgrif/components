/**
 * Created by Milan on 31.1.2017.
 */
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$loading',function ($rootScope, $location,$log, $timeout) {
        var mainCtrlLoading;
        var loadedWatchers = {};

        // $rootScope.$on('$routeChangeSuccess',function (event, current, previous) {
        //     var path = current.$$route.originalPath;
        //     $timeout(function () {
        //         $log.debug("current path = "+path);
        //         $log.debug(loadedWatchers[path]);
        //         loadedWatchers[path]();
        //     },500);
        // });

        return {
            setMainControllerCallback: function (callback) {
                mainCtrlLoading = callback;
            },
            showLoading: function (show) {
                mainCtrlLoading(show);
            },
            registerLoadWatcher: function (path, callback) {
                $log.debug("register path= "+path);
                $log.debug(callback);
                loadedWatchers[path] = callback;
            }
        };
    });
});
