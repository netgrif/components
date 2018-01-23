define(['angular', '../modules/Workflow', '../modules/Main'],
    function (angular) {
        angular.module('ngWorkflow').controller('WorkflowPanelController',
            ['$log', '$scope', '$http', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope', 'resource', 'links',
                function ($log, $scope, $http, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope, resource, links) {
                    const self = this;

                    self.links = links;

                    Object.assign(self, resource);
                }]);
    });