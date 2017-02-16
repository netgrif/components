define(['angular', '../modules/Tasks', '../modules/Main'],
    function (angular) {
        angular.module('ngTasks').controller('TasksController',
            ['$log', '$scope', '$http','$user',
                function ($log, $scope, $http, $user) {
                    var self = this;
                    var statusOrder = {
                        New: 1,
                        Assigned: 2,
                        Done: 3
                    };

                    self.tabs = [];
                    self.activeTab = 0;
                    self.globalLinks = undefined;
                    self.sort = {
                        field: 'visualId',
                        reverse: false
                    };

                    function Tab(label) {
                        this.label = label;
                        this.resource = undefined;
                        this.filter = {
                            process: {},
                            task: {},
                            chips: [],
                            filter: {
                                process: [],
                                task: []
                            },
                            request: {
                                pending: false,
                                process: []
                            }
                        }
                    }

                    self.tabs.push(new Tab("All Tasks"));
                    self.tabs.push(new Tab("My Tasks"));
                    self.tabs.push(new Tab("My Finished Tasks"));

                    self.loadTasks = function () {
                        var url;
                        if(self.activeTab == 0) url = "/res/task";
                        else if(self.activeTab == 1) url = "/res/task/my";
                        else if(self.activeTab == 2) url = "/res/task/my/finished";

                        var servedTab = self.activeTab;
                        $log.debug("loading data");
                        $http.get(url).then(function (response) {
                            self.globalLinks = self.activeTab == 0 ? response : undefined;
                            response.$request().$get("tasks").then(function (resources) {
                                self.tabs[servedTab].resource = resources;
                                $log.debug(self.tabs[servedTab].resource);
                            },function () {
                                $log.debug("Resource not found");
                            });

                        }, function () {
                            $log.debug("Tasks failed to load");
                        });
                    };

                    self.getStatus = function (task) {
                        if(task.user && task.finishDate) task.status = "Done";
                        else if(task.user && !task.finishDate && task.startDate) task.status = "Assigned";
                        else task.status = "New";
                    };

                    self.assignTask = function (task) {
                        $log.debug("Assigning task "+task.title+" to "+$user.name);
                        $http.get(task.$href("assign")).then(function (response) {
                            $log.debug(response);
                        },function () {
                            $log.debug("Assigning task "+task.title+" failed");
                        });
                    };

                    self.finishTask = function (task) {
                        $log.debug("Finishing task "+task.title+" to "+$user.name);
                        $http.get(task.$href("finish")).then(function (response) {
                            $log.debug(response);
                        },function () {
                            $log.debug("Finishing task "+task.title+" failed");
                        });
                    };

                    self.queryNetRefs = function () {
                        if(self.tabs[self.activeTab].filter.request.process.length == 0 && !self.tabs[self.activeTab].filter.request.pending){
                            self.tabs[self.activeTab].filter.request.pending = true;
                            $http.get("/res/petrinet/refs").then(function (response) {
                                response.$request().$get("petriNetReferences").then(function (resource) {
                                    self.tabs[self.activeTab].filter.request.process = resource;
                                    self.tabs[self.activeTab].filter.request.pending = false;
                                }, function () {
                                    $log.debug("Resource not found");
                                    self.tabs[self.activeTab].filter.request.pending = false;
                                });
                            }, function () {
                                $log.debug("Cannot load references to petri nets");
                                self.tabs[self.activeTab].filter.request.pending = false;
                            });
                        };
                        var search = self.tabs[self.activeTab].filter.process.search.toLowerCase();
                        return self.tabs[self.activeTab].filter.request.process.filter(function (item, index, array) {
                            var text = item.title.toLowerCase();
                            return text.startsWith(search);
                        });
                    };

                    self.processItemChange = function (item){
                        if(!item) return;
                        self.tabs[self.activeTab].filter.chips.push({type: 'process', title: item.title});
                        self.tabs[self.activeTab].filter.filter.process.push(item);
                    };

                    self.removeChip = function (index) {
                        var chip = self.tabs[self.activeTab].filter.chips[index];
                        if(chip.type == 'process'){
                            self.tabs[self.activeTab].filter.filter.process.some(function (el, index, array) {
                                if(el.title == chip.title){
                                    self.tabs[self.activeTab].filter.filter.process.splice(index,1);
                                    return true;
                                }
                            });
                        } else if (chip.type == 'task'){
                            self.tabs[self.activeTab].filter.filter.task.some(function (el, index, array) {
                                if(el.title == chip.title){
                                    self.tabs[self.activeTab].filter.filter.task.splice(index,1);
                                    return true;
                                }
                            });
                        }
                        self.tabs[self.activeTab].filter.chips.splice(index,1);
                    };

                    self.setSortField = function (field) {
                        self.sort.reverse = self.sort.field == field;
                        self.sort.field = field;
                    };

                    self.dynamicOrder = function (task) {
                        var order = 0;
                        switch (self.sort.field){
                            case 'status':
                                order = statusOrder[task.status];
                                break;
                            case 'priority':
                                self.sort.reverse = true;
                            default:
                                order = task[self.sort.field];
                        }
                        return order;
                    };


                }]);
    });
