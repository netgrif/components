/**
 * Created by Milan on 27.1.2017.
 */
define(['angular','../modules/Main', 'angularRoute'], function (angular) {
    angular.module('ngMain').controller('ContentLoadingController',
    ['$log','$scope','$route','contentLoader', function ($log, $scope, $route, contentLoader) {
        var self = this;

        self.initLoading = true;
        self.viewLoading = true;

        self.templateLoaded = function mainTemplateLoaded() {
            $log.debug("Main template loaded!");
            contentLoader.mainLoaded(initLoadingEnded);
        };

        self.viewLoaded = function () {
            self.viewLoading = false;
            $log.debug("view "+$route.current.$$route.templateUrl+" loaded");

            contentLoader.initModule($route.current.$$route.controller);
        };

        function initLoadingEnded() {
            if(self.initLoading && !self.viewLoading) {
                self.initLoading = false;
                $log.debug("init loading ended = "+!self.initLoading);
            }
        }

    }]);
});
