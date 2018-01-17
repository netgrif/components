define(['angular', '../classes/Task', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, Task) {
        angular.module('ngMain').controller('TaskController',
            ['$log', '$scope', '$http', '$snackbar', '$user', '$dialog', '$fileUpload', '$timeout', '$mdExpansionPanel', 'resource', 'links', 'tab', 'config', '$i18n',
                function ($log, $scope, $http, $snackbar, $user, $dialog, $fileUpload, $timeout, $mdExpansionPanel, resource, links, tab, config, $i18n) {
                    const self = this;
                    this.taskId = resource.stringId;
                    tab.addTaskController(this);

                    this.createTask = function (panel) {
                        $scope.task = new Task(tab, panel, resource, links,{
                            $http,
                            $snackbar,
                            $user,
                            $dialog,
                            $fileUpload,
                            $timeout,
                            $i18n
                        },config);
                        return $scope.task;
                    };

                    $scope.disableNestedClick = function($event){
                        $event.preventDefault();
                        $event.stopPropagation();
                    }
                }]);

    });
