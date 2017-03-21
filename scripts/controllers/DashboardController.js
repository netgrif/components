/**
 * Created by Milan on 27.1.2017.
 */
define(['angular','angularCharts','../modules/Dashboard','../modules/Main'],
function (angular) {
   angular.module('ngDashboard').controller('DashboardController',
       ['$log','$scope','$timeout',
        function ($log, $scope, $timeout) {
            var self = this;

            self.chart = [];
        }]);
});
