define(['angular', '../classes/Case', '../classes/ActionCase', '../classes/Filter', '../modules/Main'],
    function (angular, Case, ActionCase, Filter) {
        angular.module('ngMain').controller('DashboardController',
            ['$log', '$scope', '$user', '$snackbar', '$http', '$dialog', '$fileUpload', '$mdExpansionPanelGroup', '$cache', '$location', '$timeout', '$i18n', '$process',
                function ($log, $scope, $user, $snackbar, $http, $dialog, $fileUpload, $mdExpansionPanelGroup, $cache, $location, $timeout, $i18n, $process) {
                    const self = this;

                    self.limit = 3;
                    self.sort = {
                        attribute: "_id",
                        direction: "desc"
                    };

                    self.testArray = [];
                    for (let i = 1; i <= 5; i++) {
                        self.testArray.push(i);
                    }
                }]);
    });
