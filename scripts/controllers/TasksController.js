define(['angular', '../classes/TaskTab', '../modules/Tasks', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, TaskTab) {
        angular.module('ngTasks').controller('TasksController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope) {
                    const self = this;

                    self.message = "Tasks is active";
                }]);
    });