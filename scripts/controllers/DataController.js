/**
 * Created by martin on 6.3.2017.
 */
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngData').controller('DataController',['$log','$scope',
        function ($log, $scope) {
            var self = this;

            $scope.msg = "Tu budu data";



        }]);
});