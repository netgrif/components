/**
 * Created by Milan on 27.1.2017.
 */
define(['angular','../modules/Dashboard','../modules/Main','../services/ContentRouter'],
function (angular) {
   angular.module('ngDashboard').controller('DashboardController',
       ['$log','$scope','contentRouter',
        function ($log, $scope, contentRouter) {
            var self = this;

            self.isInForeground = true;

            self.moduleLoaded = function () {
                $log.debug("Dashboard loaded");
                contentRouter.register('dashboard',changeVisibility);
            };

            function changeVisibility(visible) {
                self.isInForeground = visible;
            }



        }]);
});
