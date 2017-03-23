define(['angular', '../modules/Tasks', '../modules/Main'],
    function (angular) {
        angular.module('ngTasks').controller('TasksController',
            ['$log', '$scope', '$http', '$user', '$snackbar', '$dialog', '$bottomSheet', '$fileUpload','$mdExpansionPanelGroup','$mdExpansionPanel','$timeout', '$scroll',
                function ($log, $scope, $http, $user, $snackbar, $dialog, $bottomSheet, $fileUpload, $mdExpansionPanelGroup, $mdExpansionPanel, $timeout, $scroll) {
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

                    function taskController($scope, task, parentController) {
                        $scope.task = task;
                        $scope.tasksCtrl = parentController;
                    }

                    self.addTab = function (label, url, type) {
                        if (label && url) {
                            self.tabs.push(new Tab(label, url));
                            var last = self.tabs.length - 1;
                            self.tabs[last].type = type;
                            return
                        }

                        if (!self.newTab) return;
                        if (!self.newTab.filter) {
                            $snackbar.show("You must select filter to apply on new tab!");
                            return;
                        }

                        var tab = new Tab(self.newTab.label);
                        tab.type = TAB_TYPE.CUSTOM;
                        tab.filter.processes = self.newTab.filter.processes;
                        tab.filter.processes.forEach(function (item) {
                            tab.filter.chips.push({type: 'processes', title: item.title});
                        });
                        tab.filter.transitions = self.newTab.filter.transitions;
                        tab.filter.transitions.forEach(function (item) {
                            tab.filter.chips.push({type: 'transitions', title: item.title});
                        });

                        self.tabs.push(tab);

                        self.newTab = undefined;
                    };

                    self.tabChanged = function () {
                        if (!self.tabs[self.activeTab].resources || self.tabs[self.activeTab].resources.length === 0) {
                            self.loadTasks();
                        }
                    };

                    self.reloadAfterAction = function () {
                        self.tabs.forEach(function (tab, index) {
                            if (index !== self.activeTab && self.tabs[index].resources) {
                                self.tabs[index].resources.splice(0, self.tabs[index].resources.length);
                            }
                        });
                        self.loadTasks();
                    };

                    self.formatDate = function (date) {
                        if (!date) return;
                        return date.dayOfMonth + "." + date.monthValue + "." + date.year + " \n"
                            + date.hour + ":" + date.minute;
                    };

                    function populateTaskGroup(tabIndex) {
                        $timeout(function () {
                            $log.debug("Populating tasks");
                            let groupId = 'taskGroup-'+tabIndex;
                            $mdExpansionPanelGroup(groupId).removeAll();
                            self.tabs[tabIndex].resources.forEach((item, index) => {
                                $mdExpansionPanelGroup(groupId).add({
                                    templateUrl: 'views/app/tasks/task_panel',
                                    controller: taskController,
                                    locals: {
                                        task: item,
                                        parentController: self
                                    }
                                }).then(function (panelCtrl) {
                                    $log.debug(panelCtrl);
                                })
                            });
                        },1000);
                    }

                    function loadTasksResource(url, tabIndex, searchData) {
                        $log.debug("loading tasks");
                        var config = {
                            method: searchData ? 'POST' : 'GET',
                            url: url
                        };
                        if (searchData) config.data = searchData;

                        $http(config).then(function (response) {
                            self.global.links = self.activeTab == 0 ? response : self.global.links;
                            response.$request().$get("tasks").then(function (resources) {
                                self.tabs[tabIndex].resources = resources;
                                $log.debug(self.tabs[tabIndex].resources);
                                //populateTaskGroup(tabIndex);
                            }, function () {
                                //$log.debug("Resource not found in " + self.tabs[tabIndex].label);
                                $snackbar.info("Resource not found in " + self.tabs[tabIndex].label);
                                if (self.tabs[tabIndex].resources) {
                                    self.tabs[tabIndex].resources.splice(0, self.tabs[tabIndex].resources.length);
                                    //$mdExpansionPanelGroup('taskGroup-'+tabIndex).removeAll();
                                }
                            });
                        }, function () {
							$snackbar.error("Tasks on " + url + " failed to load");
                            $log.debug("Tasks on " + url + " failed to load");
                        });
                    }

                    self.loadTasks = function () {
                        if (self.tabs[self.activeTab].type != TAB_TYPE.CUSTOM) {
                            if (!self.tabs[self.activeTab].filter.isEmpty()) {
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
                        if (self.tabs[self.activeTab].type === TAB_TYPE.MY ||
                            self.tabs[self.activeTab].type === TAB_TYPE.MY_FINISHED)
                            url = self.tabs[self.activeTab].baseUrl;

                        if (self.tabs[self.activeTab].filter.isEmpty()) {
                            $log.debug("Search cannot start - Filter is empty");
                            return;
                        }

                        // $log.debug("Task search with filter:");
                        // $log.debug(self.tabs[self.activeTab].filter);
                        var searchData = {
                            petrinetIds: [],
                            transitionIds: []
                        };
                        self.tabs[self.activeTab].filter.processes.forEach(function (item) {
                            searchData.petrinetIds.push(item.entityId);
                        });
                        self.tabs[self.activeTab].filter.transitions.forEach(function (item) {
                            searchData.transitionIds.push(item.entityId);
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
                            if (response.success) self.reloadAfterAction();
                            if (response.error) $snackbar.show(response.error);
                        }, function () {
                            $log.debug("Assigning task " + task.title + " failed");
                        });
                    };

                    self.delegateTask = function (task) {
                        $bottomSheet.selectAssignUser(task).then(function (user) {
                            if (user){
                                $http.post(task.$href("delegate"),user.email).then(function (response) {
                                    if(response.success) self.reloadAfterAction();
                                    if(response.error) $snackbar.error(response.error);
                                }, function () {
                                    $log.debug("Delegating task "+task.visualId+" to user "+user.name+" failed!");
                                });
                            }
                        }, function () {
                            //$log.debug("Bottom sheet canceled!");
                        });
                    };

                    function taskFinish(task) {
                        $http.get(task.$href("finish")).then(function (response) {
                            $log.debug(response);
                            if (response.success) self.reloadAfterAction();
                            if (response.error) $snackbar.show(response.error);
                        }, function () {
                            $log.debug("Finishing task " + task.title + " failed");
                        });
                    }

                    function areFieldsValid(task) {
                        let valid = task.data.every(item => {
                            if (item.type === 'file') {
                                if(item.newFile) return !!item.uploaded;
                                return !!item.newValue;
                            } else if(item.type === 'boolean'){
                                return true;
                            } else return item.logic.editable ? !!item.newValue: true;
                        });
                        if (!valid) {
                            let error = "Not all fields have values! Finish task aborted!";
                            $log.debug(error);
                            $snackbar.show(error);
                        }
                        return valid;
                    }

                    self.finishTask = function (task) {
                        $log.debug("Finishing task " + task.title + " to " + $user.name);

                        if (!task.data) {
                            self.loadTaskData(task.visualId, () => {
                                if (!task.data) {
                                    taskFinish(task);
                                } else {
                                    areFieldsValid(task);
                                }
                            });
                        } else {
                            if (areFieldsValid(task)) {
                                self.saveData(task, function (success) {
                                    if (success) taskFinish(task);
                                });
                            }
                        }
                    };

                    self.cancelTask = function (task) {
                        $log.debug("Canceling task " + task.visualId);
                        $http.get(task.$href("cancel")).then(function (response) {
                            $log.debug(response);
                            if (response.success) self.reloadAfterAction();
                            if (response.error) $snackbar.error(response.error);
                        }, function () {
                            $snackbar.error("Canceling assignment of task " + task.title + " failed");
                        });
                    };

                    function findTaskByVisualId(visualId) {
                        return self.tabs[self.activeTab].resources.findIndex(item => item.visualId === visualId);
                    }

                    function parseDataValue(value, type) {
                        if (type == 'date') {
                            if (value) return new Date(value.year, value.monthValue - 1, value.dayOfMonth);
                            else return undefined;
                        } else {
                            return value;
                        }
                    }

                    function formatDataValue(value, type) {
                        if (!value) return null;
                        let padding = text => text.length <= 1 ? "0" + text : text;
                        if (type == 'date') {
                            return value.getFullYear() + "-" + padding((value.getMonth() + 1) + "") + "-" + padding(value.getDate() + "");
                        } else {
                            return value;
                        }
                    }

                    self.loadTaskData = function (taskVisualId, callback) {
                        var taskIndex = findTaskByVisualId(taskVisualId);
                        if (self.tabs[self.activeTab].resources[taskIndex].data){
                            callback && callback();
                            return;
                        }
                        $http.get(self.tabs[self.activeTab].resources[taskIndex].$href("data")).then(function (response) {
                            $log.debug(response);
                            if (response.$response().data._embedded) {
                                self.tabs[self.activeTab].resources[taskIndex].data = [];
                                Object.keys(response.$response().data._embedded).forEach(function (item, index, array) {
                                    response.$request().$get(item).then(function (resource) {
                                        self.tabs[self.activeTab].resources[taskIndex].data = self.tabs[self.activeTab].resources[taskIndex].data.concat(resource);
                                        self.tabs[self.activeTab].resources[taskIndex].data = self.tabs[self.activeTab].resources[taskIndex].data.map(function (item) {
                                            item.newValue = parseDataValue(item.value, item.type);
                                            item.changed = false;
                                            item.taskIndex = taskIndex;
                                            callback && callback();
                                            return item;
                                        });
                                        if (index == array.length - 1) {
                                            callback && callback();
                                        }
                                    });
                                });
                            } else {
                                $log.debug("No data for task " + self.tabs[self.activeTab].resources[taskIndex].visualId);
                                callback && callback();
                            }
                        }, function () {
                            $log.debug("Data for " + self.tabs[self.activeTab].resources[taskIndex].visualId + " failed to load!");
                            callback && callback();
                        });
                    };

                    self.dataFieldChanged = function (taskIndex, fieldIndex) {
                        self.tabs[self.activeTab].resources[taskIndex].data[fieldIndex].changed = true;
                    };

                    function autoPlusLogic(fieldIndex, taskIndex) {
                        const logic = self.tabs[self.activeTab].resources[taskIndex].data[fieldIndex].logic.autoPlus;
                        const refField = self.tabs[self.activeTab].resources[taskIndex].data.find(item => item.objectId === logic.ref);

                        let autoValue;
                        if(refField.type === 'text'){
                            autoValue = refField.newValue + logic.value;
                        } else if(refField.type === 'number'){
                            autoValue = refField.newValue + logic.value;
                        } else if(refField.type === 'date'){
                            const mode = logic.value.charAt(logic.value.length-1);
                            const addValue = parseInt(logic.value.substr(0,logic.value.length-1));
                            if(addValue == 'NaN') return;
                            autoValue = new Date(refField.newValue.getTime());
                            switch (mode){
                                case 'd':
                                    autoValue.setDate(autoValue.getDate()+addValue);
                                    break;
                                case 'm':
                                    autoValue.setMonth(autoValue.getMonth()+addValue); //TODO: 23/3/2017 handle if month value overflow
                                    break;
                                case 'y':
                                    autoValue.setFullYear(autoValue.getFullYear()+addValue);
                                    break;
                            }
                        }

                        if(autoValue){
                            self.dataFieldChanged(taskIndex, fieldIndex);
                            self.tabs[self.activeTab].resources[taskIndex].data[fieldIndex].newValue = autoValue;
                        }
                    }

                    function applyFieldLogic(field, index) {
                        if(!field.logic) return;
                        Object.keys(field.logic).forEach(item => {
                            switch (item){
                                case "autoPlus":
                                    autoPlusLogic(index,field.taskIndex);
                                    break;
                            }
                        });
                    }

                    self.saveData = function (task, callback) {
                        if (!task.data) return;

                        var dataFields = {};
                        task.data.forEach((item, index) => {
                            applyFieldLogic(item, index);
                        });
                        task.data.forEach(function (item, index) {
                            if (item.changed) {
                                dataFields[item.objectId] = {
                                    type: item.type,
                                    value: formatDataValue(item.newValue, item.type)
                                };
                            }
                        });

                        if (jQuery.isEmptyObject(dataFields)) {
                            callback && callback(true);
                            return;
                        }

                        $http.post(task.$href("data-edit"), JSON.stringify(dataFields)).then(function (response) {
                            $log.debug(response);
                            task.data.forEach(function (item, index) {
                                if (item.changed) {
                                    self.tabs[self.activeTab].resources[item.taskIndex].data[index].changed = false;
                                }
                            });

                            callback && callback(true);
                        }, function () {
                            $snackbar.error("Saving data has failed!");
                            callback && callback(false);
                        });
                    };

                    $scope.fileModelChange = function (field) {
                        if (!field.file) return;
                        field.newValue = field.file.name;
                        field.newFile = field.value != field.newValue;
                        field.uploaded = false;

                        let fieldIndex = self.tabs[self.activeTab].resources[field.taskIndex].data.findIndex(item => item.objectId == field.objectId);
                        self.tabs[self.activeTab].resources[field.taskIndex].data[fieldIndex] = field;
                    };

                    self.uploadFile = function (field) {
                        if (!field.file) return;
                        //TODO: 15/3/2017 check if file does not exceed allowed size
                        $fileUpload.upload(field.file, undefined, self.tabs[self.activeTab].resources[field.taskIndex].$href('file') + field.objectId, response => {
                            if (response) {
                                let fieldIndex = self.tabs[self.activeTab].resources[field.taskIndex].data.findIndex(item => item.objectId == field.objectId);
                                self.tabs[self.activeTab].resources[field.taskIndex].data[fieldIndex].uploaded = true;
                                self.tabs[self.activeTab].resources[field.taskIndex].data[fieldIndex].newFile = true;
                                $snackbar.info("File " + field.file.name + " successfully uploaded");
                            } else {
                                $snackbar.error("File " + field.file.name + " failed to upload!");
                            }
                        });
                    };

                    self.downloadFile = function (field) {
                        let downloadWindow = window.open(self.tabs[self.activeTab].resources[field.taskIndex].$href('file') + field.objectId);
                        downloadWindow.onload = () => downloadWindow.close();
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
                                return el.entityId === item.entityId;
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
                                return item.entityId;
                            }).toString();
                            self.tabs[self.activeTab].filter.processesDirty = false;
                            return loadAutocompleteItems("/res/petrinet/transition/refs/" + ids, "transitionReferences", 'transitions',
                                self.tabs[self.activeTab].filter.selectedTransition.search);
                        }
                        return filterAutocomplete(self.tabs[self.activeTab].filter.selectedTransition.search, self.global.autocomplete.transitions);
                    };

                    self.transitionSearchChange = function (item) {
                        if (!item) return;
                        if (!self.tabs[self.activeTab].filter.transitions.some(function (el) {
                                return el.entityId === item.entityId;
                            })) {
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

                    self.removeChip = function (chip) {
                        // var chip = self.tabs[self.activeTab].filter.chips[index];
                        removeFilterItem(chip);
                        // self.tabs[self.activeTab].filter.chips.splice(index, 1);
                    };

                    self.setSortField = function (field) {
                        self.tabs[self.activeTab].sort.reverse = self.tabs[self.activeTab].sort.field == field ? !self.tabs[self.activeTab].sort.reverse : false;
                        self.tabs[self.activeTab].sort.field = field;
                    };

                    function visualIdOrder(visualId) {
                        let idParts = visualId.split('-');
                        let stringPartNum = 0;
                        for(let i=0; i<idParts[0].length; i++){
                            stringPartNum += parseInt(idParts[0][i]);
                        }
                        //jQuery.each(idParts[0], (index, value) => stringPartNum += value.charCodeAt(0));

                        return stringPartNum + parseInt(idParts[1]);
                    }

                    self.dynamicOrder = function (task) {
                        if (self.activeTab >= self.tabs.length) return;
                        let order = 0;
                        switch (self.tabs[self.activeTab].sort.field) {
                            case 'visualId':
                                order = visualIdOrder(task.visualId);
                                break;
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

                    function resolveFilterAccess(organization, user) {
                        if (!organization && !user) return "Global";
                        else if (!organization && user) return "Private";
                        else if (organization && !user) return organization;

                    }

                    self.loadFilters = function () {
                        if (self.global.availableFilters.length <= 0) {
                            $http.get("/res/task/filter").then(function (response) {
                                response.$request().$get("filters").then(function (resource) {
                                    resource.forEach(function (item, index) {
                                        self.global.availableFilters.push({
                                            name: item.name,
                                            access: resolveFilterAccess(item.organization, item.user),
                                            filter: {
                                                processes: item.petriNets,
                                                transitions: item.transitions
                                            }
                                        });
                                    });

                                }, function () {
                                    $log.debug("Resource filters not found");
                                });
                            }, function () {
                                $log.debug("Cannot load filters");
                            });
                        }
                    };

                    self.showFilterDialog = function () {
                        if (self.tabs[self.activeTab].filter.isEmpty()) {
                            $snackbar.show("Your filter is empty! You cannot save empty filter.");
                            return;
                        }
                        $dialog.showByTemplate('save_filter', self);
                    };

                    self.saveFilter = function () {
                        if (!self.newFilter) return;

                        var newFilter = {
                            name: self.newFilter.name,
                            visibility: self.newFilter.visibility,
                            petriNets: self.tabs[self.activeTab].filter.processes,
                            transitions: self.tabs[self.activeTab].filter.transitions
                        };

                        $http.post("/res/task/filter", JSON.stringify(newFilter))
                            .then(function (response) {
                                $log.debug(response);
                                self.newFilter.name = undefined;
                                self.newFilter.visibility = undefined;
                                $dialog.closeCurrent();

                            }, function (error) {
                                $log.debug("Saving filter " + newFilter.name + " failed!");
                                $log.debug(error);
                            });
                    };

                    self.clearFilter = function () {
                        self.tabs[self.activeTab].filter.processes.splice(0, self.tabs[self.activeTab].filter.processes.length);
                        self.tabs[self.activeTab].filter.processesDirty = false;

                        self.tabs[self.activeTab].filter.transitions.splice(0, self.tabs[self.activeTab].filter.transitions.length);
                        self.tabs[self.activeTab].filter.chips.splice(0, self.tabs[self.activeTab].filter.chips.length);

                        self.tabs[self.activeTab].filter.selectedProcess.search = "";
                        self.tabs[self.activeTab].filter.selectedProcess.item = undefined;

                        self.tabs[self.activeTab].filter.selectedTransition.search = "";
                        self.tabs[self.activeTab].filter.selectedTransition.item = undefined;
                    };

					self.scrollToTop = function () {
                        $scroll.toTop();
                        // $location.hash('top');
                        // $anchorScroll();
                        $log.debug("Back to top striggered");
                    };

                    // jQuery(window).scroll(function () {
                    //     if (jQuery(this).scrollTop() >= 100)
                    //         jQuery('.btn-to-top').fadeIn(200);
                    //     else
                    //         jQuery('.btn-to-top').fadeOut(200);
                    // });

                    self.addTab("All Tasks", "/res/task", TAB_TYPE.ALL);
                    self.addTab("My Tasks", "/res/task/my", TAB_TYPE.MY);
                    //self.addTab("My Finished Tasks", "/res/task/my/finished", TAB_TYPE.MY_FINISHED);

                }]);
    });
