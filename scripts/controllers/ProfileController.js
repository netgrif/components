define(['angular', '../modules/Main'],
    function (angular) {
        angular.module('ngMain').controller('ProfileController',
            ['$log', '$scope', '$snackbar', '$user', '$i18n', '$rootScope',
                function ($log, $scope, $snackbar, $user, $i18n, $rootScope) {
                    const self = this;

                    self.message = "Profile is active";
                }]);
    });