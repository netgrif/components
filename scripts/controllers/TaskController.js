define(['angular', '../classes/Task', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, Task) {
        angular.module('ngMain').controller('TaskController',
            ['$log', '$scope', '$http', '$snackbar', '$user', '$dialog', '$fileUpload', '$timeout', '$mdExpansionPanel','resource','links','tab',
                function ($log, $scope, $http, $snackbar, $user, $dialog, $fileUpload, $timeout, $mdExpansionPanel, resource, links, tab) {
                    //const self = this;
                    this.taskId = resource.stringId;
                    tab.addTaskController(this);

                    this.createTask = function (panel) {
                        $scope.task = new Task(tab, panel, resource, links,{
                            $http,
                            $snackbar,
                            $user,
                            $dialog,
                            $fileUpload,
                            $timeout
                        });
                        return $scope.task;
                    };

                    $scope.disableNestedClick = function($event){
                        $event.preventDefault();
                        $event.stopPropagation();
                    }
                }]);
    });
