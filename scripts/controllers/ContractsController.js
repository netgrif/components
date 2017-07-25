define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../modules/Contracts', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab) {
        angular.module('ngContracts').controller('ContractsController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup) {
                    const self = this;

                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.taskTabs = [];
                    self.caseTab = new CaseTab("My Contracts", this, {$http, $dialog, $snackbar, $user, $fileUpload}, {
                        processName: "Insurance",
                        transitionName: "Informácie o províziach",
                        filter: [CaseTab.FIND_BY_AUTHOR, CaseTab.FIND_BY_PETRINET, CaseTab.FIND_BY_TRANSITION]
                    });

                    self.tabChanged = function () {
                        self.activeTab = self.taskTabs[self.activeTabIndex - 1];
                        self.activeTab.activate();
                    };

                    /**
                     * add new tab for case's tasks if not already exists, then send refresh signal
                     * @param {Object} useCase
                     */
                    self.openTaskTab = function (useCase) {
                        if (!self.taskTabs.some(tab => tab.useCase.stringId === useCase.stringId))
                            self.taskTabs.push(new TaskTab(self.taskTabs.length, useCase.title, TaskTab.URL_SEARCH, [TaskTab.FIND_BY_CASE], useCase, {
                                $http,
                                $snackbar,
                                $dialog,
                                $user,
                                $fileUpload,
                                $timeout,
                                $mdExpansionPanelGroup
                            }, {
                                showTransactions: false,
                                allowHighlight: false,
                            }));
                        else
                            self.activeTabIndex = self.taskTabs.findIndex(tab => tab.useCase.stringId === useCase.stringId) + 1;

                    };

                    self.closeTab = function (useCaseId) {
                        const index = self.taskTabs.findIndex(tab => tab.useCase.stringId === useCaseId);
                        if (index !== -1) {
                            self.taskTabs.splice(index, 1);
                            self.activeTabIndex = index < self.activeTabIndex ? self.activeTabIndex - 1 : self.activeTabIndex;
                        }
                    }


                }]);
    });
