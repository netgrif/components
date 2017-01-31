/**
 * Created by Milan on 27.1.2017.
 */
define(['angular','../modules/Dashboard','../modules/Main'],
function (angular) {
   angular.module('ngDashboard').controller('DashboardController',
       ['$log','$scope','$timeout',
        function ($log, $scope, $timeout) {
            var self = this;

            self.range = function (range) {
                var a = [];
                for(var i=0; i<range; i++){
                    a.push(i);
                }
                return a;
            };

        }]);
});
