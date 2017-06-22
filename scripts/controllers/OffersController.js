define(['angular', '../classes/CaseTab', '../modules/Offers', '../modules/Main'],
    function (angular, CaseTab) {
        angular.module('ngOffers').controller('OffersController',
            ['$log', '$scope', '$http', '$dialog',
                function ($log, $scope, $http, $dialog) {
                    const self = this;

                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.taskTabs = [];
                    self.caseTab = new CaseTab("My Offers",this,$http,$dialog);

                    self.tabChanged = function () {
                        self.activeTab = self.taskTabs[self.activeTabIndex - 1];
                        self.activeTab.activate();
                    };

                    /**
                     * add new tab for case's tasks if not already exists, then send refresh signal
                     * @param {Case} useCase
                     */
                    self.openTaskTab = function (useCase) {
                        if (!self.taskTabs.some(tab => tab.useCase.stringId === useCase.stringId))
                            self.taskTabs.push(new TaskTab(useCase));
                    };

                    self.closeTab = function (index) {
                        self.taskTabs.splice(index,1);
                        self.activeTabIndex = index < self.activeTabIndex ? self.activeTabIndex - 1 : self.activeTabIndex;
                    }


                }]);
    });
