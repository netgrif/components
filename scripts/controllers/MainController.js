/**
 * Created by Milan on 31.1.2017.
 */
define(['angular','../modules/Main','../services/Loading'],function (angular) {
    angular.module('ngMain').controller('MainController',['$loading','$timeout',
    function ($loading, $timeout) {
        var self = this;

        self.showLoading = true;

        $loading.setMainControllerCallback(setLoading);

        self.loadData = function () {
            $timeout(function () {
                self.showLoading = false;
            },500);
        };


        function setLoading(show) {
            self.showLoading = show;
        }


    }]);
});