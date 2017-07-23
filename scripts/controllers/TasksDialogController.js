define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../classes/Task', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab, Task) {
        angular.module('ngMain').controller('TasksDialogController',
            ['$log', '$scope', '$http', '$mdDialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', 'locals',
                function ($log, $scope, $http, $mdDialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, locals) {
                    const self = this;

                    Object.assign(this,locals);



                    $scope.hide = function () {
                        $mdDialog.hide();
                    };


                }]);
    });
