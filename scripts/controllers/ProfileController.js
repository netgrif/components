define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').controller('ProfileController', ['$log', '$scope',
    function ($log, $scope) {
        const self = this;

        $scope.msg = "Tu bude profile usera";

    }]);
});
