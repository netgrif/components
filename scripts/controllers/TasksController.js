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
                    var TAB_TYPE = {
                        ALL: 0,
                        MY: 1,
                        MY_FINISHED: 2,
                        CUSTOM: 3
                    };

                    self.tabs = [];
                    self.activeTab = 0;
                    self.global = {
                        links: undefined,
                        autocomplete: {
                            pending: false,
                            processes: [],
                            transitions: []
                        },
                        availableFilters: []
                    };

                    //Tab object
                    function Tab(label, url) {
                        this.label = label;
                        this.baseUrl = url;
                        this.type = undefined;
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
                            },
                            isEmpty: function () {
                                return this.chips.length <= 0;
                            }
                        };
                        this.sort = {
                            reverse: false,
                            field: 'visualId'
                        };
                    }

                    self.addTab = function (label, url, type) {
                        if(label && url) self.tabs.push(new Tab(label, url));
                        else self.tabs.push(self.newTab.label);

                        var last = self.tabs.length-1;
                        self.tabs[last].type = type;

                        if(self.newTab){
                            //TODO: 21.2. parse dropdown filters value to
                        }
                    };

                    self.tabChanged = function () {
                        if(!self.tabs[self.activeTab].resources){
                            self.loadTasks();
                        }
                    };

                    function loadTasksResource(url, tabIndex, searchData) {
                        $log.debug("loading tasks");
                        var config = {
                            method: searchData ? 'POST' : 'GET',
                            url: url
                        };
                        if(searchData) config.data = searchData;

                        $http(config).then(function (response) {
                            self.global.links = self.activeTab == 0 ? response : self.global.links;
                            response.$request().$get("tasks").then(function (resources) {
                                self.tabs[tabIndex].resources = resources;
                                $log.debug(self.tabs[tabIndex].resources);
                            }, function () {
                                $log.debug("Resource not found in"+self.tabs[tabIndex].label);
                            });
                        }, function () {
                            $log.debug("Tasks on "+url+" failed to load");
                        });
                    }

                    self.loadTasks = function () {
                        if(self.tabs[self.activeTab].type < TAB_TYPE.CUSTOM){
                            if(!self.tabs[self.activeTab].filter.isEmpty()){
                                self.searchTasks();
                            } else {
                                loadTasksResource(self.tabs[self.activeTab].baseUrl, self.activeTab);
                            }
                        } else {
                            self.searchTasks();
                        }
                    };

                    self.searchTasks = function () {
                        var url = "/res/task/search";
                        if(self.tabs[self.activeTab].type === TAB_TYPE.MY ||
                            self.tabs[self.activeTab].type === TAB_TYPE.MY_FINISHED)
                            url = self.tabs[self.activeTab].baseUrl;

                        if(self.tabs[self.activeTab].filter.isEmpty()){
                            $log.debug("Search cannot start - Filter is empty");
                            return;
                        }

                        var searchData = {
                            petrinetIds: [],
                            transitionIds: []
                        };
                        self.tabs[self.activeTab].filter.processes.forEach(function (item) {
                            searchData.petrinetIds.push(item.id);
                        });
                        self.tabs[self.activeTab].filter.transitions.forEach(function (item) {
                            searchData.transitionIds.push(item.id);
                        });

                        loadTasksResource(url, self.activeTab, searchData);
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
                    
                    self.loadFilters = function () {
                        //TODO: http request to server for available filters
                        self.global.availableFilters.push({name:"Filter 1", access:"Global", filter:{processes:[], transitions:[]}});
                        self.global.availableFilters.push({name:"Filter 2", access:"Private", filter:{processes:[], transitions:[]}});
                        self.global.availableFilters.push({name:"Filter 3", access:"FM Servis", filter:{processes:[], transitions:[]}});
                    };

                    self.addTab("All Tasks", "/res/task", TAB_TYPE.ALL);
                    self.addTab("My Tasks", "/res/task/my", TAB_TYPE.MY);
                    self.addTab("My Finished Tasks", "/res/task/my/finished", TAB_TYPE.MY_FINISHED);

                }]);
    });
