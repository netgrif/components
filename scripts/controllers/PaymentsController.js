define(['angular', '../modules/Payments'],
    function (angular) {
        angular.module('ngPayments').controller('PaymentsController',
            ['$log', '$scope', '$timeout', '$dialog', '$i18n',
                function ($log, $scope, $timeout, $dialog, $i18n) {
                    const self = this;

                    self.registerPanelToGroup = function () {
                        self.contactsPanelGroup = $mdExpansionPanelGroup("payments-panel-group");
                        try {
                            self.contactsPanelGroup.register('paymentPanel', {
                                templateUrl: "views/app/panels/task_view_panel.html",
                                controller: "TaskController",
                                controllerAs: "taskCtrl"
                            });
                        } catch (error) {
                            //panel already registered
                        }
                    };

                }]);
    });