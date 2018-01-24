define(['angular', '../modules/Workflow', '../modules/Main'],
    function (angular) {
        angular.module('ngWorkflow').controller('WorkflowPanelController',
            ['$log', '$scope', '$http', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope', 'resource', 'links',
                function ($log, $scope, $http, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope, resource, links) {
                    const self = this;

                    self.links = links;

                    self.parseDate = function (isoDate) {
                        return new Date();
                    };

                    Object.assign(self, resource);
                    self.uploadDate = self.parseDate(self.creationDate);
                }]);
    });