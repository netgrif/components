/**
 * Created by Milan on 4.2.2017.
 */
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').controller('ProfileController',['$log','$scope',
    function ($log, $scope) {
        var self = this;

        $scope.msg = "Tu bude profile usera";



    }]);
});
