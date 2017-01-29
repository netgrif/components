/**
 * Created by Milan on 29.1.2017.
 */
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').controller('ProfileController',
    ['$log','$scope','contentLoader', function ($log, $scope, contentLoader) {
        var self = this;

        $scope.msg = "";

        contentLoader.register('ProfileController',init);

        function init() {
            $scope.msg = "User profile will be here!";
        }
    }]);
});