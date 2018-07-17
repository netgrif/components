define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../classes/Filter', '../modules/Cases', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab, Filter) {
        angular.module('ngCases').controller('CasesDataController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope', '$process', '$config',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope, $process, $config) {
                    const self = this;

                    self.headerFields = [
                        $i18n.block.case.header.visualID,
                        $i18n.block.case.header.title,
                        $i18n.block.case.header.author,
                        $i18n.block.case.header.createDate
                    ];

                    // For UI test purpose only
                    self.testCaseMetaData = [
                        $i18n.block.case.header.visualID,
                        $i18n.block.case.header.title,
                        $i18n.block.case.header.author,
                        $i18n.block.case.header.createDate
                    ];
                    self.testFields = [
                        "Field 1",
                        "Field 2",
                        "Field 3",
                        "Field 4"
                    ];

                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.taskTabs = [];
                    self.caseTab = new CaseTab("Cases", this, new Filter("Base case filter", Filter.CASE_TYPE, "{}"), {
                        $http,
                        $dialog,
                        $snackbar,
                        $user,
                        $fileUpload,
                        $timeout,
                        $i18n,
                        $process
                    }, {
                        caseDelete: $config.enable.cases.caseDelete,

                        authorityToCreate: ["ROLE_USER", "ROLE_ADMIN"],
                        allowedNets: $process.nets
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
                            self.taskTabs.push(new TaskTab(self.taskTabs.length, useCase.title,
                                new Filter("Default By Case", Filter.CASE_TYPE, "{\"case\": \"" + useCase.stringId + "\"}"),
                                useCase, {
                                    $http,
                                    $snackbar,
                                    $dialog,
                                    $user,
                                    $fileUpload,
                                    $timeout,
                                    $mdExpansionPanelGroup,
                                    $i18n,
                                    $process
                                }, {
                                    allowHighlight: $config.enable.cases.allowHighlight,
                                    autoOpenUnfinished: $config.enable.cases.autoOpenUnfinished,
                                    searchable: $config.show.cases.taskSearch,
                                    fullReload: $config.enable.cases.fullReload,

                                    showTransactions: $config.show.cases.transactions,
                                    taskPriority: $config.show.cases.taskPriority,
                                    taskCaseTitle: $config.show.cases.taskCaseTitle
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

                    const navClickListener = $rootScope.$on("navClick", (event, data) => {
                        if (data.item === "casesData")
                            self.activeTabIndex = 0;
                    });
                    $scope.$on('$destroy', navClickListener);
                }]);
    });