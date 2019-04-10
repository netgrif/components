define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../classes/Filter', '../modules/Cases', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab, Filter) {
        angular.module('ngCases').controller('CasesController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope', '$process', '$config', '$filterRepository',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope, $process, $config, $filterRepository) {
                    const self = this;

                    self.viewId = $config.show.cases.viewId;
                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.taskTabs = [];
                    self.caseHeaders = $user.getPreferenceCaseHeaders(self.viewId + "-" + CaseTab.HEADERS_PREFERENCE_KEY);
                    self.caseTab = new CaseTab("Cases", this, $filterRepository.get(self.viewId), {
                        $http,
                        $dialog,
                        $snackbar,
                        $user,
                        $fileUpload,
                        $timeout,
                        $i18n,
                        $process,
                        $config
                    }, {
                        caseDelete: $config.enable.cases.caseDelete,
                        viewId: self.viewId,
                        authorityToCreate: ["ROLE_USER", "ROLE_ADMIN"],
                        allowedNets: $process.nets,
                        preselectedHeaders: self.caseHeaders ? self.caseHeaders : ["meta-visualId", "meta-title", "meta-author", "meta-creationDate"]
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
                                    $process,
                                    $rootScope,
                                    $config
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
                        self.caseTab.load(false);
                    };

                    if ($cache.get("dashboard") && $cache.get("dashboard").cases) {
                        self.caseTab.openCase($cache.get("dashboard").cases);
                        self.activeTabIndex = self.taskTabs.length;
                        $cache.remove("dashboard");
                    }

                    const navClickListener = $rootScope.$on("navClick", (event, data) => {
                        if (data.item === self.viewId) {
                            self.activeTabIndex = 0;
                            self.caseTab.load(false);
                        }
                    });

                    const noTasksListener = $rootScope.$on("noTasks", (event) => {
                        if (self.taskTabs && self.taskTabs.length > 0)
                            self.closeTab(this.activeTab.useCase.stringId);
                    });

                    $scope.$on('$destroy', navClickListener);
                    $scope.$on('$destroy', noTasksListener);
                    $scope.$on('$destroy', function() {
                        self.caseTab.searchInput=undefined;
                        self.caseTab.search();
                        $scope.$emit('reloadCounters');
                    });

                }]);
    });