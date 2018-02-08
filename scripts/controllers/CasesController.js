define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../classes/Filter', '../modules/Cases', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab, Filter) {
        angular.module('ngCases').controller('CasesController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope) {
                    const self = this;

                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.taskTabs = [];
                    self.caseTab = new CaseTab("Cases", this, {
                        $http,
                        $dialog,
                        $snackbar,
                        $user,
                        $fileUpload,
                        $timeout,
                        $i18n
                    }, {
                        // processName: "Insurance Demo", //process name
                        // filter: [CaseTab.FIND_BY_AUTHOR, CaseTab.FIND_BY_PETRINET],
                        //transitionNames: ["Nehnuteľnosť a domácnosť", "Základné informácie", "Údaje o zmluve"],
                        //caseType: "regular"
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
                            self.taskTabs.push(new TaskTab(self.taskTabs.length, useCase.title, new Filter("Default By Case", Filter.CASE_TYPE, {case: useCase.stringId}, {}), useCase, {
                                $http,
                                $snackbar,
                                $dialog,
                                $user,
                                $fileUpload,
                                $timeout,
                                $mdExpansionPanelGroup,
                                $i18n
                            }, {
                                showTransactions: true,
                                allowHighlight: true
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
                    };

                    if ($cache.get("dashboard") && $cache.get("dashboard").cases) {
                        self.caseTab.openCase($cache.get("dashboard").cases);
                        self.activeTabIndex = self.taskTabs.length;
                        $cache.remove("dashboard");
                    }
                    if ($cache.get("create") && $cache.get("create").cases) {
                        self.caseTab.openNewCaseDialog($i18n.page.cases.this);
                        $cache.remove("create");
                    }
                    const caseCreateListener = $rootScope.$on("caseCreate", (event, type) => {
                        if (type === "cases")
                            self.caseTab.openNewCaseDialog($i18n.page.cases.this);
                    });
                    $scope.$on('$destroy', () => caseCreateListener());
                }]);
    });