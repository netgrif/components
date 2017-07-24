define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../classes/Task', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab, Task) {
        angular.module('ngMain').controller('TasksDialogController',
            ['$log', '$scope', '$http', '$mdDialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', 'locals',
                function ($log, $scope, $http, $mdDialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, locals) {
                    const self = this;

                    Object.assign(this, locals, locals.locals);
                    self.taskTab = undefined;

                    self.openTaskTab = function () {
                        self.taskTab = new TaskTab("dialog", self.useCase.title, TaskTab.URL_SEARCH, [TaskTab.FIND_BY_CASE], self.useCase, {
                            $http,
                            $snackbar,
                            $user,
                            $fileUpload,
                            $timeout,
                            $mdExpansionPanelGroup
                        }, {showTransactions: false});
                    };


                    $scope.hide = function () {
                        $mdDialog.hide();
                    };

                    self.openTaskTab();
                    self.taskTab.activate();
                }]);
    });
