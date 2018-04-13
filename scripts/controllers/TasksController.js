define(['angular', '../classes/TaskTab', '../classes/FilterTab', '../classes/Filter', '../modules/Tasks', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, TaskTab, FilterTab, Filter) {
        angular.module('ngTasks').controller('TasksController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope', '$process',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope, $process) {
                    const self = this;

                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.filterTab = new FilterTab(self, {
                        $http,
                        $snackbar,
                        $dialog,
                        $i18n
                    }, {});
                    self.taskTabs = [];

                    self.openTaskTabs = function (filter = [], closable = true, filterPolicy = TaskTab.REPLACE_FILTER_POLICY) {
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
                                $process
                            }, {
                                closable: closable,
                                filterPolicy: filterPolicy,
                                searchable: true,
                                allowHighlight: false,
                                showTransactions: false,
                                autoOpenUnfinished: false,
                                fullReload: true
                            }));
                        });
                        if (closable) {
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
                        self.taskTabs.splice(taskTabIndex, 1);
                        self.activeTabIndex--;
                    };

                    const navClickListener = $rootScope.$on("navClick", (event, data) => {
                        if (data.item === 'tasks')
                            self.activeTabIndex = 0;
                    });
                    $scope.$on('$destroy', navClickListener);

                    self.openTaskTabs([new Filter($i18n.page.tasks.all, Filter.TASK_TYPE, "{}", "{}", null, null)], false);
                    self.openTaskTabs([new Filter($i18n.page.tasks.my, Filter.TASK_TYPE, "{\"user\":\"" + $user.login + "\"}", "{\"User\": [\"" + $user.name + "\"]}", null, null)], false, TaskTab.MERGE_FILTER_POLICY);
                    self.activeTabIndex = 0;
                }]);
    });