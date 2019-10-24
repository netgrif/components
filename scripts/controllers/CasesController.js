define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../classes/FilterTab', '../classes/Filter', '../classes/Search', '../modules/Cases', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab, FilterTab, Filter, Search) {
        angular.module('ngCases').controller('CasesController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope', '$process', '$config', '$filterRepository',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope, $process, $config, $filterRepository) {
                    const self = this;

                    self.viewId = $config.show.cases.viewId;
                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.taskTabs = [];
                    self.caseHeaders = $user.getPreferenceCaseHeaders(self.viewId + "-" + CaseTab.HEADERS_PREFERENCE_KEY);
                    self.caseTabs = [new CaseTab("Cases", this, $filterRepository.get(self.viewId), {
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
                    })];

                    self.filterTab = new FilterTab(Filter.CASE_TYPE, self, {
                        $http,
                        $snackbar,
                        $dialog,
                        $i18n,
                        $user,
                        $rootScope,
                        $config
                    }, {});

                    self.tabChanged = function () {
                        let processedIndex = self.decodeActiveTabIndex();
                        if(processedIndex.isCaseTab)
                            self.activeTab = self.caseTabs[processedIndex.index];
                        else
                            self.activeTab = self.taskTabs[processedIndex.index];

                        self.activeTab.activate();
                    };

                    /**
                     * add new tab for case's tasks if not already exists, then send refresh signal
                     * @param {Object} useCase
                     */
                    self.openTaskTab = function (useCase) {
                        if (!self.taskTabs.some(tab => tab.useCase.stringId === useCase.stringId))
                            self.taskTabs.push(new TaskTab(self.taskTabs.length, useCase.title,
                                new Filter("Default By Case", Filter.TASK_TYPE, Search.queryByCaseStringId(useCase.stringId, Search.SEARCH_TASKS)),
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

                    self.openTabFromFilters = function(filters) {
                        // TODO
                    };

                    self.closeTaskTab = function (useCaseId) {
                        const index = self.taskTabs.findIndex(tab => tab.useCase.stringId === useCaseId);
                        if (index !== -1) {
                            self.taskTabs.splice(index, 1);
                            self.activeTabIndex = index < self.activeTabIndex ? self.activeTabIndex - 1 : self.activeTabIndex;
                        }
                    };

                    self.closeTab = function (index, isCaseTab) {
                        if(isCaseTab)
                            self.caseTabs.splice(index, 1);
                        else
                            self.taskTabs.splice(index, 1);

                        let combinedIndex = index;
                        if(!isCaseTab)
                            combinedIndex += self.caseTabs.length;
                        self.activeTabIndex = combinedIndex < self.activeTabIndex-1 ? self.activeTabIndex - 1 : self.activeTabIndex;
                    };

                    self.decodeActiveTabIndex = function() {
                        return {
                            isCaseTab: self.activeTabIndex < self.caseTabs.length,
                            index: self.activeTabIndex < self.caseTabs.length ? self.activeTabIndex : self.activeTabIndex - self.caseTabs.length
                        };
                    };

                    self.activateCaseTab = function(caseTabIndex) {
                        if(caseTabIndex < 0 || caseTabIndex >= self.caseTabs.length)
                            throw new Error("CaseTab with given index doesn't exist!");
                        else
                            self.activeTabIndex = caseTabIndex;
                    };

                    self.activateTaskTab = function(taskTabIndex) {
                        if(taskTabIndex < 0 || taskTabIndex >= self.taskTabs.length)
                            throw new Error("TaskTab with given index doesn't exist!");
                        else
                            self.activeTabIndex = taskTabIndex + self.caseTabs.length;
                    };

                    if ($cache.get("dashboard") && $cache.get("dashboard").cases) {
                        self.openTaskTab($cache.get("dashboard").cases);
                        self.activateTaskTab(self.taskTabs.length-1);
                        $cache.remove("dashboard");
                    }

                    const navClickListener = $rootScope.$on("navClick", (event, data) => {
                        if (data.item === self.viewId) {
                            self.activeTabIndex = 0;
                            self.caseTabs[0].load(false);
                        }
                    });

                    const noTasksListener = $rootScope.$on("noTasks", (event) => {
                        if (self.taskTabs && self.taskTabs.length > 0)
                            self.closeTaskTab(this.activeTab.useCase.stringId);
                    });

                    $scope.$on('$destroy', navClickListener);
                    $scope.$on('$destroy', noTasksListener);
                    $scope.$on('$destroy', function() {
                        self.caseTabs[0].caseSearch.resetInputFields();
                        self.caseTabs[0].caseSearch.clearFilter();
                        $scope.$emit('reloadCounters');
                    });

                }]);
    });