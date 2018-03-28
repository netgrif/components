define(['angular', '../modules/Main'],
    function (angular) {
        angular.module('ngMain').controller('SettingsController',
            ['$http', '$log', '$scope', '$snackbar', '$user', '$i18n', '$rootScope', '$config',
                function ($http, $log, $scope, $snackbar, $user, $i18n, $rootScope, $config) {
                    const self = this;

                    self.changeUserSignUpPolicy = $config.enable.userSignUp;
                }
            ]
        );
    });