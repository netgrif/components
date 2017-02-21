define(['angular', '../modules/Tasks', '../modules/Main'],
    function (angular) {
        angular.module('ngTasks').controller('TasksController',
            ['$log', '$scope', '$http', '$user','$snackbar',
                function ($log, $scope, $http, $user, $snackbar) {
                    var self = this;
                    var statusOrder = {
                        New: 1,
                        Assigned: 2,
                        Done: 3
                    };

                    self.tabs = [];
                    self.activeTab = 0;
                    self.global = {
                        links: undefined,
                        autocomplete: {
                            pending: false,
                            processes: [],
                            transitions: []
                        }
                    };

                    //Tab object
                    function Tab(label) {
                        this.label = label;
                        this.resources = undefined;
                        this.filter = {
                            processes: [],
                            processesDirty: false,
                            transitions: [],
                            chips: [],
                            selectedProcess: {
                                search: "",
                                item: undefined
                            },
                            selectedTransition: {
                                search: "",
                                item: undefined
                            }
                        };
                        this.sort = {
                            reverse: false,
                            field: 'visualId'
                        };
                    }

                    self.tabs.push(new Tab("All Tasks"));
                    self.tabs.push(new Tab("My Tasks"));
                    self.tabs.push(new Tab("My Finished Tasks"));

                    self.loadTasks = function () { //TODO: 20.2. autoload, consider active filter, load only for current task
                        var url;
                        if (self.activeTab == 0) url = "/res/task";
                        else if (self.activeTab == 1) url = "/res/task/my";
                        else if (self.activeTab == 2) url = "/res/task/my/finished";

                        var servedTab = self.activeTab;
                        $log.debug("loading data");
                        $http.get(url).then(function (response) {
                            self.global.links = self.activeTab == 0 ? response : undefined;
                            response.$request().$get("tasks").then(function (resources) {
                                self.tabs[servedTab].resources = resources;
                                $log.debug(self.tabs[servedTab].resources);
                            }, function () {
                                $log.debug("Resource not found");
                            });

                        }, function () {
                            $log.debug("Tasks failed to load");
                        });
                    };

                    self.getStatus = function (task) {
                        if (task.user && task.finishDate) task.status = "Done";
                        else if (task.user && !task.finishDate && task.startDate) task.status = "Assigned";
                        else task.status = "New";
                    };

                    self.assignTask = function (task) {
                        $log.debug("Assigning task " + task.title + " to " + $user.name);
                        $http.get(task.$href("assign")).then(function (response) {
                            $log.debug(response);
                        }, function () {
                            $log.debug("Assigning task " + task.title + " failed");
                        });
                    };

                    self.finishTask = function (task) {
                        $log.debug("Finishing task " + task.title + " to " + $user.name);
                        $http.get(task.$href("finish")).then(function (response) {
                            $log.debug(response);
                        }, function () {
                            $log.debug("Finishing task " + task.title + " failed");
                        });
                    };

                    function endLoadAutocompleteItems(search, storage) {
                        self.global.autocomplete.pending = false;
                        return filterAutocomplete(search, self.global.autocomplete[storage]);
                    }

                    function loadAutocompleteItems(url, resourceName, storage, search) {
                        self.global.autocomplete.pending = true;
                        return $http.get(url).then(function (response) {
                            return response.$request().$get(resourceName).then(function (resource) {
                                self.global.autocomplete[storage] = resource;
                                return endLoadAutocompleteItems(search, storage);
                            }, function () {
                                $log.debug("Resource " + resourceName + " not found on url " + url);
                                return endLoadAutocompleteItems(search, storage);
                            });
                        }, function (error) {
                            $log.debug("Failed to load " + url);
                            $log.debug(error);
                            return endLoadAutocompleteItems(search, storage);
                        });
                    }

                    function filterAutocomplete(search, storage) {
                        // if (!search) return storage;
                        search = search.toLowerCase();
                        return storage.filter(function (item) {
                            var text = item.title.toLowerCase();
                            return text.startsWith(search);
                        });
                    }

                    self.queryProcesses = function () {
                        if (!self.global.autocomplete.pending && self.global.autocomplete.processes.length == 0) {
                            return loadAutocompleteItems("/res/petrinet/refs", "petriNetReferences", 'processes',
                                self.tabs[self.activeTab].filter.selectedProcess.search);
                        }
                        return filterAutocomplete(self.tabs[self.activeTab].filter.selectedProcess.search, self.global.autocomplete.processes);
                    };

                    self.processSearchChange = function (item) {
                        if (!item) return;
                        if (!self.tabs[self.activeTab].filter.processes.some(function (el) {
                                return el.id === item.id;
                            })) {
                            self.tabs[self.activeTab].filter.chips.push({type: 'processes', title: item.title});
                            self.tabs[self.activeTab].filter.processes.push(item);
                            self.tabs[self.activeTab].filter.processesDirty = true;
                        }
                    };

                    function canLoadTransitions() {
                        var p = self.tabs[self.activeTab].filter.processes.length > 0 &&
                                self.tabs[self.activeTab].filter.processesDirty;
                        var t = self.global.autocomplete.transitions.length <= 0;
                        return (t && p) || p;
                    }

                    self.queryTransitions = function () {
                        if (canLoadTransitions() && !self.global.autocomplete.pending) {
                            var ids = self.tabs[self.activeTab].filter.processes.map(function (item) {
                                return item.id;
                            }).toString();
                            self.tabs[self.activeTab].filter.processesDirty = false;
                            return loadAutocompleteItems("/res/petrinet/transition/refs/" + ids, "transitionReferences", 'transitions',
                                self.tabs[self.activeTab].filter.selectedTransition.search);
                        }
                        return filterAutocomplete(self.tabs[self.activeTab].filter.selectedTransition.search, self.global.autocomplete.transitions);
                    };

                    self.transitionSearchChange = function (item) {
                        if(!item) return;
                        if(!self.tabs[self.activeTab].filter.transitions.some(function (el) {
                                return el.id === item.id;
                            })){
                            self.tabs[self.activeTab].filter.chips.push({type: 'transitions', title: item.title});
                            self.tabs[self.activeTab].filter.transitions.push(item);
                        }
                    };

                    function removeFilterItem(chip) {
                        self.tabs[self.activeTab].filter[chip.type].some(function (item, index) {
                            if (item.title === chip.title) {
                                self.tabs[self.activeTab].filter[chip.type].splice(index, 1);
                                if (chip.type === 'processes') self.tabs[self.activeTab].filter.processesDirty = true;
                                return true;
                            }
                        });
                    }

                    self.removeChip = function (index) {
                        var chip = self.tabs[self.activeTab].filter.chips[index];
                        removeFilterItem(chip);
                        self.tabs[self.activeTab].filter.chips.splice(index, 1);
                    };

                    self.setSortField = function (field) {
                        self.tabs[self.activeTab].sort.reverse = self.tabs[self.activeTab].sort.field == field ? !self.tabs[self.activeTab].sort.reverse : false;
                        self.tabs[self.activeTab].sort.field = field;
                    };

                    self.dynamicOrder = function (task) {
                        var order = 0;
                        switch (self.tabs[self.activeTab].sort.field) {
                            case 'status':
                                order = statusOrder[task.status];
                                break;
                            case 'priority':
                                self.tabs[self.activeTab].sort.reverse = true;
                            default:
                                order = task[self.tabs[self.activeTab].sort.field];
                        }
                        return order;
                    };


                }]);
    });
