define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../modules/Offers', '../modules/Main','angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab) {
        angular.module('ngOffers').controller('OffersController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload','$timeout','$mdExpansionPanelGroup',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup) {
                    const self = this;

                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.taskTabs = [];
                    self.caseTab = new CaseTab("My Offers", this, {$http, $dialog, $snackbar, $user});

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
                            self.taskTabs.push(new TaskTab(self.taskTabs.length, useCase.title, TaskTab.URL_BYCASE, useCase, {
                                $http,
                                $snackbar,
                                $dialog,
                                $user,
                                $fileUpload,
                                $timeout,
                                $mdExpansionPanelGroup
                            }));
                        else
                            self.activeTabIndex = self.taskTabs.findIndex(tab => tab.useCase.stringId === useCase.stringId) + 1;

                    };

                    self.closeTab = function (useCaseId) {
                        const index = self.taskTabs.splice(self.taskTabs.findIndex(tab => tab.useCase.stringId === useCaseId), 1);
                        self.activeTabIndex = index < self.activeTabIndex ? self.activeTabIndex - 1 : self.activeTabIndex;
                    }


                }]);
    });
