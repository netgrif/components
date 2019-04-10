define(['angular', '../classes/TaskTab', '../classes/FilterTab', '../classes/Filter', '../modules/Tasks', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, TaskTab, FilterTab, Filter) {
        angular.module('ngTasks').controller('TasksController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope', '$process', '$config', '$filterRepository',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope, $process, $config, $filterRepository) {
                    const self = this;

                    self.viewId = $config.show.tasks.viewId;
                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.filterTab = new FilterTab(self, {
                        $http,
                        $snackbar,
                        $dialog,
                        $i18n,
                        $user,
                        $rootScope,
                        $config
                    }, {});
                    self.taskTabs = [];

                    self.openTaskTabs = function (filter = [], closable = true, filterPolicy = TaskTab.REPLACE_FILTER_POLICY, filterTab = false) {
                        const lastIndex = self.taskTabs.length;
                        filter.forEach(f => {
                            self.taskTabs.push(new TaskTab(self.taskTabs.length, f.title, f, null, {
                                $http,
                                $snackbar,
                                $dialog,
                                $user,
                                $fileUpload,
                                $timeout,
                                $mdExpansionPanelGroup,
                                $i18n,
                                $process,
                                $config
                            }, {
                                closable: closable,
                                filterPolicy: filterPolicy,
                                searchable: $config.show.tasks.taskSearch,
                                allowHighlight: $config.enable.tasks.allowHighlight,
                                autoOpenUnfinished: $config.enable.tasks.autoOpenUnfinished,
                                fullReload: $config.enable.tasks.fullReload,

                                showTransactions: $config.show.tasks.transactions,
                                taskPriority: $config.show.tasks.taskPriority,
                                taskCaseTitle: $config.show.tasks.taskCaseTitle
                            }));
                        });
                        if (closable && !filterTab) {
                            $timeout(() => {
                                self.activeTabIndex = lastIndex;
                                self.tabChanged();
                            }, 200);
                        }
                    };

                    self.tabChanged = function () {
                        self.activeTab = self.taskTabs[self.activeTabIndex];
                        self.activeTab.activate();
                    };

                    self.closeTaskTab = function (taskTabIndex) {
                        let closedTab = self.taskTabs[taskTabIndex];
                        self.taskTabs.splice(taskTabIndex, 1);
                        self.activeTabIndex--;
                        if (closedTab.baseFilter.stringId) {
                            let saved = $user.getPreferenceTaskFilters(self.viewId);
                            $user.savePreferenceTaskFilters(self.viewId, saved.filter(f => f !== closedTab.baseFilter.stringId));
                        }
                    };

                    const navClickListener = $rootScope.$on("navClick", (event, data) => {
                        if (data.item === self.viewId) {
                            self.activeTabIndex = 0;
                            self.activeTab = self.taskTabs[self.activeTabIndex];
                            self.activeTab.reload();
                        }
                    });
                    $scope.$on('$destroy', navClickListener);

                    self.openTaskTabs([$filterRepository.get("tasks")], false);
                    self.openTaskTabs([$filterRepository.get("tasks-my")], false, TaskTab.MERGE_FILTER_POLICY);
                    self.activeTabIndex = 0;
                    self.filterTab.reload(false);

                    $timeout(() => {
                        self.openTaskTabs(self.filterTab.getSelectedFilters(), true, TaskTab.REPLACE_FILTER_POLICY, true);
                    }, 200);
                }]);
    });