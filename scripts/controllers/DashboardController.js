/**
 * Created by Milan on 27.1.2017.
 */
define(['angular','../modules/Dashboard','../modules/Main','../services/ContentLoader'],
function (angular) {
   angular.module('ngDashboard').controller('DashboardController',
       ['$log','$scope','contentLoader','$timeout',
        function ($log, $scope, contentLoader, $timeout) {
            var self = this;

            contentLoader.register('DashboardController',init);

            function init() {
                $timeout(function () {
                    $log.debug("Dashboard Content Loaded");
                    contentLoader.contentLoaded();
                },500);
            }

            self.range = function (range) {
                var a = [];
                for(var i=0; i<range; i++){
                    a.push(i);
                }
                return a;
            };

        }]);
});
