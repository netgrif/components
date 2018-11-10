define(['angular', '../classes/Case', '../classes/ActionCase', '../classes/Filter', '../classes/DataField', '../modules/Main'],
    function (angular, Case, ActionCase, Filter, DataField) {
        angular.module('ngMain').controller('DashboardController',
            ['$log', '$scope', '$user', '$snackbar', '$http', '$dialog', '$fileUpload', '$mdExpansionPanelGroup', '$cache', '$location', '$timeout', '$i18n', '$process',
                function ($log, $scope, $user, $snackbar, $http, $dialog, $fileUpload, $mdExpansionPanelGroup, $cache, $location, $timeout, $i18n, $process) {
                    const self = this;

                    self.limit = 3;
                    self.sort = {
                        attribute: "_id",
                        direction: "desc"
                    };

                }]);
    });
