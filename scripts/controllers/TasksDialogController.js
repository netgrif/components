define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../classes/Task', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab, Task) {
        angular.module('ngMain').controller('TasksDialogController',
            ['$log', '$scope', '$http', '$mdDialog', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup',
                function ($log, $scope, $http, $mdDialog, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup) {
                    const self = this;

                    self.taskTab = undefined;


                    self.activate = function () {
                        Object.assign(self, $dialog.cache);
                        self.openTaskTab();
                        self.taskTab.activate((self.requestedTask ? self.requestedTask.stringId : undefined));
                    };

                    self.openTaskTab = function () {
                        self.taskTab = new TaskTab("dialog", self.useCase.title, TaskTab.URL_SEARCH, [TaskTab.FIND_BY_CASE], self.useCase, {
                            $http,
                            $snackbar,
                            $user,
                            $fileUpload,
                            $timeout,
                            $mdExpansionPanelGroup
                        }, {
                            showTransactions: false,
                            allowHighlight: false
                        });
                    };

                    $scope.hide = function () {
                        $mdDialog.hide();
                        self.taskTab.removeAll();
                    };

                    $dialog.addCallback("tasksDialogController",self.activate);
                }]);
    });
