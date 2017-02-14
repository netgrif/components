define(['angular', '../modules/Tasks', '../modules/Main'],
    function (angular) {
        angular.module('ngTasks').controller('TasksController',
            ['$log', '$scope', '$http','$user',
                function ($log, $scope, $http, $user) {
                    var self = this;

                    self.tabs = [
                        {
                            label: "All Tasks",
                            resource: undefined,
                            filter: undefined
                        },
                        {
                            label: "My Tasks",
                            resource: undefined,
                            filter: undefined
                        },
                        {
                            label: "My Finished Tasks",
                            resource: undefined,
                            filter: undefined
                        }];
                    self.activeTab = 0;
                    self.globalLinks = undefined;

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

                }]);
    });
