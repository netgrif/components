define(['angular', '../modules/Main', '../modules/Workflow'], function (angular) {
    class Tab {
        constructor(index, useCase, $http, $snackbar) {
            this.index = index;
            this.useCase = useCase;
            this.$http = $http;
            this.$snackbar = $snackbar;

            this.tasks = [];
            this.sort = {
                field: '',
                reverse: false
            }
        }

        setSortField(field) {
            this.sort.reverse = this.sort.field === field ? !this.sort.reverse : false;
            this.sort.field = field;
        }

        getStatus(task) {
            if (task.user && task.finishDate) task.status = "Done";
            else if (task.user && !task.finishDate && task.startDate) task.status = "Assigned";
            else task.status = "New";
        };

        loadTasks() {
            const self = this;
            this.$http.post("/res/task/case", [this.useCase.stringId]).then(function (response) {
                response.$request().$get("tasks").then(function (resources) {
                    self.tasks = resources;
                    self.tasks.forEach(task => self.getStatus(task));
                }, function () {
                    self.$snackbar("Task resources was not found!");
                    self.tasks.splice(0, self.tasks.length);
                })
            }, function () {
                self.$snackbar("Failed to tasks for case " + self.useCase.title);
            })
        }

        assignTask(task) {
            const self = this;
            this.$http.get(task.$href("assign")).then(function (response) {
                if (response.success) self.loadTasks();
                if (response.error) self.$snackbar.error(response.error);
            }, function () {
                self.$snackbar.error("Assigning task " + task.title + " failed");
            });
        };

        cancelTask(task) {
            const self = this;
            this.$http.get(task.$href("cancel")).then(function (response) {
                if (response.success) self.loadTasks();
                if (response.error) self.$snackbar.error(response.error);
            }, function () {
                self.$snackbar.error("Canceling assignment of task " + task.title + " failed");
            });
        };

        loadTaskData(visualId) {

        }
    }

    angular.module('ngWorkflow').controller('CaseController', ['$log', '$scope', '$http', '$snackbar', '$dialog',
        function ($log, $scope, $http, $snackbar, $dialog) {
            var self = this;

            self.activeTabIndex = undefined;
            self.activeTab = undefined;
            self.cases = [];
            self.tabs = [];
            self.newCase = {};
            self.filter = {
                search: undefined,
                selected: undefined,
                chips: [],
                filter: [],
                nets: []
            };
            self.sort = {
                field: '',
                reverse: false
            };

            self.searchCases = function () {
                $http.post("/res/workflow/case/search", self.filter.filter).then(function (response) {
                    response.$request().$get("cases").then(function (resources) {
                        self.cases = resources;
                    }, function () {
                        $snackbar.error("No resource for cases was found!");
                        self.cases.splice(0, self.cases.length);
                    });
                }, function () {
                    $snackbar.error("Getting cases failed!");
                })
            };

            self.tabChange = function () {
                self.activeTab = self.tabs[self.activeTabIndex - 1];
                self.activeTab.loadTasks();
            };

            self.createNewCase = function () {
                self.loadPetriNets();
                $dialog.showByTemplate('create_case', self).then(function () {
                    self.activeTabIndex = 0;
                });
            };

            self.openCase = function (useCase) {
                if (!self.tabs.some(tab => tab.useCase.stringId === useCase.stringId))
                    self.tabs.push(new Tab(self.tabs.length, useCase, $http, $snackbar));
            };

            self.tabClose = function (tabIndex) {
                self.tabs.splice(tabIndex, 1);
                self.activeTabIndex = tabIndex < self.activeTabIndex ? self.activeTabIndex - 1 : self.activeTabIndex;
                for (let i = tabIndex; i < self.tabs.length; i++) {
                    self.tabs[i].index = i;
                }
            };

            self.searchItemSelected = function (item) {
            };

            self.queryNets = function () {
            };

            self.onChipRemove = function (chip) {
            };

            self.setSortField = function (field) {
                self.sort.reverse = self.sort.field === field ? !self.sort.reverse : false;
                self.sort.field = field;
            };

            self.createCase = function () {
                if (!jQuery.isEmptyObject(self.newCase) || !self.newCase.netId) {
                    $http.post("/res/workflow/case", JSON.stringify(self.newCase))
                        .then(function (response) {
                            if (response.success) $dialog.closeCurrent();
                            self.newCase = {};
                            self.searchCases();
                        }, function () {
                            $snackbar.error("Creating new case failed!");
                            self.newCase = {};
                        });
                }
            };

            self.loadPetriNets = function () {
                $http.get("/res/petrinet/refs").then(function (response) {
                    response.$request().$get("petriNetReferences").then(function (resource) {
                        self.petriNetRefs = resource;
                    });
                }, function () {
                    $snackbar.error("Petri net refs get failed!");
                });
            };
        }]);
});