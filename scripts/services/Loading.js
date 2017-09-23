
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$loading',function ($rootScope, $location,$log, $timeout) {
        var mainCtrlLoading;

        return {
            setMainControllerCallback: function (callback) {
                mainCtrlLoading = callback;
            },
            showLoading: function (show) {
                mainCtrlLoading(show);
            }
        };
    });
});
