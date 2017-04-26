define(['angular', '../modules/Tasks', '../modules/Main'],
    function (angular) {
        angular.module('ngTasks').controller('TasksController',
            ['$log', '$scope', '$http', '$user', '$snackbar', '$dialog', '$fileUpload', '$mdExpansionPanelGroup', '$mdExpansionPanel', '$timeout', '$scroll', '$i18n',
                function ($log, $scope, $http, $user, $snackbar, $dialog, $fileUpload, $mdExpansionPanelGroup, $mdExpansionPanel, $timeout, $scroll, $i18n) {
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
                            transitions: [],
                            fields: []
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
                            transitionsDirty: false,
                            fields: [],
                            chips: [],
                            selectedProcess: {
                                search: "",
                                item: undefined
                            },
                            selectedTransition: {
                                search: "",
                                item: undefined
                            },
                            selectedField: {
                                search: "",
                                item: undefined,
                                value: undefined
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

                    const paddingZero = text => {
                        text = text.toString();
                        return text.length <= 1 ? "0" + text : text;
                    };

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
                        return paddingZero(date.dayOfMonth) + "." + paddingZero(date.monthValue) + "." + date.year + " \n"
                            + paddingZero(date.hour) + ":" + paddingZero(date.minute);
                    };

                    function populateTaskGroup(tabIndex) {
                        $timeout(function () {
                            $log.debug("Populating tasks");
                            let groupId = 'taskGroup-' + tabIndex;
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
                        }, 1000);
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
                                self.tabs[tabIndex].resources.forEach(resource => self.getStatus(resource));
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
                        let url = "/res/task/search";
                        if (self.tabs[self.activeTab].type === TAB_TYPE.MY ||
                            self.tabs[self.activeTab].type === TAB_TYPE.MY_FINISHED)
                            url = self.tabs[self.activeTab].baseUrl;

                        if (self.tabs[self.activeTab].filter.isEmpty()) {
                            //$snackbar.info("Search cannot start - Filter is empty");
                            url = url === "/res/task/search" ? "/res/task" : url;
                            loadTasksResource(url,self.activeTab);
                            return;
                        }

                        // $log.debug("Task search with filter:");
                        // $log.debug(self.tabs[self.activeTab].filter);
                        let searchTier;
                        if(self.tabs[self.activeTab].filter.processes.length > 0) searchTier = 1;
                        if(self.tabs[self.activeTab].filter.transitions.length > 0) searchTier = 2;
                        if(self.tabs[self.activeTab].filter.fields.length > 0) searchTier = 3;

                        const searchData = {
                            searchTier: searchTier,
                            petriNets: []
                        };
                        self.tabs[self.activeTab].filter.processes.forEach(process => {
                            const net = {
                                petriNet: process.entityId,
                                transitions: [],
                                dataSet: {}
                            };
                            self.tabs[self.activeTab].filter.transitions.forEach(trans => {
                                if(trans.petriNetId === process.entityId) net.transitions.push(trans.entityId);
                            });
                            self.tabs[self.activeTab].filter.fields.forEach(field => {
                                if(field.petriNetId === process.entityId) net.dataSet[field.entityId] = field.value;
                            });

                            searchData.petriNets.push(net);
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
                        $dialog.showByTemplate('assign_user', self, {task: task}).then(function (user) {
                            if (!user) return;
                            $http.post(task.$href("delegate"), user.email).then(function (response) {
                                if (response.success) self.reloadAfterAction();
                                else if (response.error) $snackbar.error(response.error);
                            }, function () {
                                $log.debug("Delegating task " + task.visualId + " to user " + user.name + " failed!");
                            });
                        }, function () {

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

                    /**
                     * Check if are required fields are valid before finish task
                     * @param task
                     * @returns {boolean}
                     */
                    function areFieldsValid(task) {
                        let valid = task.data.every(item => {
                            if (item.logic.required) {
                                if (item.type === 'file') {
                                    if (item.newFile) return !!item.uploaded;
                                    return !!item.newValue;
                                } else if (item.type === 'boolean') {
                                    return true;
                                } else if( item.type === 'number') {
                                    return item.newValue !== undefined && item.newValue !== null;
                                } else return !!item.newValue;

                            } else return true;
                        });
                        if (!valid) {
                            const error = "Not all required fields have values! Required fields are marked with asterisk (*)";
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

                    function parseDataValue(value, type, item) {
                        if (type == 'date') {
                            if (value) return new Date(value.year, value.monthValue - 1, value.dayOfMonth);
                            else return undefined;
                        }
                        if (type == 'user') {
                            //TODO: 28/3/2017 get user profile [on backend make endpoint for one user]
                            if(value)
                                item.user = {name: "", email: item.value};
                        }
                        return value;
                    }

                    function formatDataValue(value, type) {
                        if (!value) return null;
                        if (type == 'date') {
                            return value.getFullYear() + "-" + paddingZero((value.getMonth() + 1) + "") + "-" + paddingZero(value.getDate() + "");
                        }
                        return value;
                    }

                    self.loadTaskData = function (taskVisualId, callback) {
                        var taskIndex = findTaskByVisualId(taskVisualId);
                        if (self.tabs[self.activeTab].resources[taskIndex].data) {
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
                                            item.newValue = parseDataValue(item.value, item.type, item);
                                            item.changed = false;
                                            item.taskIndex = taskIndex;
                                            callback && callback();
                                            return item;
                                        });
                                        //TODO: 23/3/2017 check expansion footer rendering in PROD, if no problem found remove sleep
                                        $timeout(function () {
                                        }, 100);
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
                        if (!refField.newValue) return;

                        let autoValue;
                        if (refField.type === 'text') {
                            autoValue = refField.newValue + logic.value;
                        } else if (refField.type === 'number') {
                            autoValue = refField.newValue + logic.value;
                        } else if (refField.type === 'date') {
                            const mode = logic.value.charAt(logic.value.length - 1);
                            const addValue = parseInt(logic.value.substr(0, logic.value.length - 1));
                            if (addValue == 'NaN') return;
                            autoValue = new Date(refField.newValue.getTime());
                            switch (mode) {
                                case 'd':
                                    autoValue.setDate(autoValue.getDate() + addValue);
                                    break;
                                case 'm':
                                    autoValue.setMonth(autoValue.getMonth() + addValue); //TODO: 23/3/2017 handle if month value overflow
                                    break;
                                case 'y':
                                    autoValue.setFullYear(autoValue.getFullYear() + addValue);
                                    break;
                            }
                        }

                        if (autoValue) {
                            self.dataFieldChanged(taskIndex, fieldIndex);
                            self.tabs[self.activeTab].resources[taskIndex].data[fieldIndex].newValue = autoValue;
                        }
                    }

                    function applyFieldLogic(field, index) {
                        if (!field.logic) return;
                        Object.keys(field.logic).forEach(item => {
                            switch (item) {
                                case "autoPlus":
                                    autoPlusLogic(index, field.taskIndex);
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
                            $snackbar.success("Data successfully saved");
                            callback && callback(true);
                        }, function () {
                            $snackbar.error("Saving data has failed!");
                            callback && callback(false);
                        });
                    };

                    self.userFieldChoice = function (field, fieldIndex, user) {
                        if (user) {
                            self.tabs[self.activeTab].resources[field.taskIndex].data[fieldIndex].user = {
                                name: user.name,
                                email: user.login
                            };
                            self.tabs[self.activeTab].resources[field.taskIndex].data[fieldIndex].newValue = user.login;

                            self.dataFieldChanged(field.taskIndex, fieldIndex);
                            self.saveData(self.tabs[self.activeTab].resources[field.taskIndex]);
                        } else {
                            $dialog.showByTemplate('assign_user', self, {task: Object.assign({assignRole: field.roles[0]},self.tabs[self.activeTab].resources[field.taskIndex])}).then(function (user) {
                                if (!user) return;
                                self.tabs[self.activeTab].resources[field.taskIndex].data[fieldIndex].user = user;
                                self.tabs[self.activeTab].resources[field.taskIndex].data[fieldIndex].newValue = user.email;

                                self.dataFieldChanged(field.taskIndex, fieldIndex);
                                self.saveData(self.tabs[self.activeTab].resources[field.taskIndex]);
                            }, function () {

                            });
                        }
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

                    function loadAutocompleteItems(method, url, data, resourceName, storage, search) {
                        self.global.autocomplete.pending = true;
                        const httpPromise = method === 'post' ? $http.post(url,data) : $http.get(url);
                        return httpPromise.then(function (response) {
                            return response.$request().$get(resourceName).then(function (resource) {
                                self.global.autocomplete[storage] = resource;
                                return endLoadAutocompleteItems(search, storage);
                            }, function () {
                                $log.debug("Resource " + resourceName + " not found on url " + url);
                                self.global.autocomplete[storage] = [];
                                return endLoadAutocompleteItems(search, storage);
                            });
                        }, function (error) {
                            $log.debug("Failed to load " + url);
                            $log.debug(error);
                            return endLoadAutocompleteItems(search, storage);
                        });
                    }

                    function filterAutocomplete(search, storage) {
                        if (!search) return storage;
                        search = search.toLowerCase();
                        return storage.filter(function (item) {
                            const text = item.title.toLowerCase();
                            return text.startsWith(search);
                        });
                    }

                    self.queryProcesses = function () {
                        if (!self.global.autocomplete.pending && self.global.autocomplete.processes.length === 0) {
                            return loadAutocompleteItems("get","/res/petrinet/refs", undefined,"petriNetReferences", 'processes',
                                self.tabs[self.activeTab].filter.selectedProcess.search);
                        }
                        return filterAutocomplete(self.tabs[self.activeTab].filter.selectedProcess.search, self.global.autocomplete.processes);
                    };

                    self.processSearchChange = function (item) {
                        if (!item) return;
                        if (!self.tabs[self.activeTab].filter.processes.some(function (el) {
                                return el.entityId === item.entityId;
                            })) {
                            self.tabs[self.activeTab].filter.chips.push({type: 'processes', title: item.title, id: item.entityId});
                            self.tabs[self.activeTab].filter.processes.push(item);
                            self.tabs[self.activeTab].filter.processesDirty = true;
                        }
                    };

                    function canLoadTransitions() {
                        const p = self.tabs[self.activeTab].filter.processes.length > 0 &&
                            self.tabs[self.activeTab].filter.processesDirty;
                        const t = self.global.autocomplete.transitions.length <= 0;
                        return (t && p) || p;
                    }

                    self.queryTransitions = function () {
                        if (canLoadTransitions() && !self.global.autocomplete.pending) {
                            const ids = self.tabs[self.activeTab].filter.processes.map(item => item.entityId);
                            self.tabs[self.activeTab].filter.processesDirty = false;
                            return loadAutocompleteItems("post","/res/petrinet/transition/refs", ids, "transitionReferences", 'transitions',
                                self.tabs[self.activeTab].filter.selectedTransition.search);
                        }
                        if(self.tabs[self.activeTab].filter.processes.length <= 0) self.global.autocomplete.transitions = [];
                        return filterAutocomplete(self.tabs[self.activeTab].filter.selectedTransition.search, self.global.autocomplete.transitions);
                    };

                    self.transitionSearchChange = function (item) {
                        if (!item) return;
                        if (!self.tabs[self.activeTab].filter.transitions.some(function (el) {
                                return el.entityId === item.entityId;
                            })) {
                            self.tabs[self.activeTab].filter.chips.push({type: 'transitions', title: item.title, id: item.entityId});
                            self.tabs[self.activeTab].filter.transitions.push(item);
                            self.tabs[self.activeTab].filter.transitionsDirty = true;
                            //clear input
                            self.tabs[self.activeTab].filter.selectedTransition.search = "";
                            self.tabs[self.activeTab].filter.selectedTransition.item = undefined;
                        }
                    };

                    function canLoadFields() {
                        const t = self.tabs[self.activeTab].filter.transitions.length > 0 &&
                                self.tabs[self.activeTab].filter.transitionsDirty;
                        const f = self.global.autocomplete.fields.length <= 0;
                        return (t && f) || t;
                    }

                    self.queryFields = function () {
                        if(canLoadFields() && !self.global.autocomplete.pending){
                            const netIds = [];
                            self.tabs[self.activeTab].filter.transitions.forEach(item => {
                                if(!netIds.includes(item.petriNetId)) netIds.push(item.petriNetId);
                            });
                            const transIds = self.tabs[self.activeTab].filter.transitions.map(item => item.entityId);
                            self.tabs[self.activeTab].filter.transitionsDirty = false;
                            return loadAutocompleteItems("post","/res/petrinet/data/refs",{petriNets: netIds, transitions: transIds},"dataFieldReferences","fields",
                                self.tabs[self.activeTab].filter.selectedField.search);
                        }
                        if(self.tabs[self.activeTab].filter.transitions.length <= 0) self.global.autocomplete.fields = [];
                        return filterAutocomplete(self.tabs[self.activeTab].filter.selectedField.search, self.global.autocomplete.fields);
                    };

                    self.fieldSearchChange = function (item) {
                        if(!item) return;
                        self.tabs[self.activeTab].filter.selectedField.value = undefined;
                        angular.element("#field-value-input-"+self.activeTab).focus();
                    };

                    self.fieldValueSelected = function () {
                        if(self.tabs[self.activeTab].filter.selectedField.value){
                            self.tabs[self.activeTab].filter.selectedField.value.trim();
                            if(self.tabs[self.activeTab].filter.selectedField.value.length > 0){

                                const selItem = self.tabs[self.activeTab].filter.selectedField.item;
                                const val = self.tabs[self.activeTab].filter.selectedField.value;

                                if(!self.tabs[self.activeTab].filter.fields.some(el => el.entityId === selItem.entityId && el.value === val)){
                                    self.tabs[self.activeTab].filter.chips.push({type:"fields", title: selItem.title+": "+val, id: selItem.entityId});
                                    self.tabs[self.activeTab].filter.fields.push(Object.assign(selItem,{value: val}));

                                    self.tabs[self.activeTab].filter.selectedField.search = "";
                                    self.tabs[self.activeTab].filter.selectedField.item = undefined;
                                    self.tabs[self.activeTab].filter.selectedField.value = undefined;
                                }
                            }
                        }
                    };

                    function rebuildChips(excludedIds = []) {
                        self.tabs[self.activeTab].filter.chips = self.tabs[self.activeTab].filter.chips.filter(chip => !excludedIds.includes(chip.id));
                    }

                    function removeFilterItem(chip) {
                        self.tabs[self.activeTab].filter[chip.type].some(function (item, index) {
                            if (item.entityId === chip.id) {
                                self.tabs[self.activeTab].filter[chip.type].splice(index, 1);
                                if (chip.type === 'processes'){
                                    self.tabs[self.activeTab].filter.processesDirty = true;
                                    const excludes = [];
                                    self.tabs[self.activeTab].filter.transitions = self.tabs[self.activeTab].filter.transitions.filter(trans => {
                                        if(trans.petriNetId !== chip.id) return true;
                                        else {
                                            excludes.push(trans.entityId);
                                            self.tabs[self.activeTab].filter.fields = self.tabs[self.activeTab].filter.fields.filter(field => {
                                                if(field.transitionId !== trans.entityId) return true;
                                                else {
                                                    excludes.push(field.entityId);
                                                    return false;
                                                }
                                            });
                                            return false;
                                        }
                                    });
                                    rebuildChips(excludes);
                                }
                                if (chip.type === 'transitions') {
                                    self.tabs[self.activeTab].filter.transitionsDirty = true;
                                    const excludes = [];
                                    self.tabs[self.activeTab].filter.fields = self.tabs[self.activeTab].filter.fields.filter(field => {
                                        if(field.transitionId !== chip.id) return true;
                                        else {
                                            excludes.push(field.entityId);
                                            return false;
                                        }
                                    });
                                    rebuildChips(excludes);
                                }
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
                        self.tabs[self.activeTab].sort.reverse = self.tabs[self.activeTab].sort.field === field ? !self.tabs[self.activeTab].sort.reverse : false;
                        self.tabs[self.activeTab].sort.field = field;
                    };

                    function visualIdOrder(visualId) {
                        let idParts = visualId.split('-');
                        let stringPartNum = 0;
                        for (let i = 0; i < idParts[0].length; i++) {
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
                            case 'username':
                                if (task.user)
                                    order = task.user.name + task.user.surname;
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
                        self.global.availableFilters.splice(0, self.global.availableFilters.length);
                        $http.get("/res/task/filter").then(function (response) {
                            response.$request().$get("filters").then(function (resource) {
                                resource.forEach(function (item) {
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
                                $log.debug("No filter resource found!");
                            });
                        }, function () {
                            $snackbar.error("Cannot load filters!");
                        });
                    };

                    self.showFilterDialog = function () {
                        if (self.tabs[self.activeTab].filter.isEmpty()) {
                            $snackbar.show("Your filter is empty! You cannot save empty filter.");
                            return;
                        }
                        $dialog.showByTemplate('save_filter', self,{filter: self.tabs[self.activeTab].filter.processes.map(net => net.entityId)});
                    };

                    self.saveFilter = function () {
                        if (!self.newFilter) return;

                        const newFilter = {
                            name: self.newFilter.name,
                            visibility: self.newFilter.visibility,
                            roles: self.newFilter.roles,
                            petriNets: self.tabs[self.activeTab].filter.processes,
                            transitions: self.tabs[self.activeTab].filter.transitions
                        };

                        $http.post("/res/task/filter", JSON.stringify(newFilter))
                            .then(function (response) {
                                $log.debug(response);
                                self.newFilter.name = undefined;
                                self.newFilter.visibility = undefined;
                                self.newFilter.roles = undefined;
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

                    self.addTab($i18n.page.tasks.tab.allTasks, "/res/task", TAB_TYPE.ALL);
                    self.addTab($i18n.page.tasks.tab.myTasks, "/res/task/my", TAB_TYPE.MY);
                    //self.addTab("My Finished Tasks", "/res/task/my/finished", TAB_TYPE.MY_FINISHED);
                    //Load roles persist filters
                    $http.post("/res/task/filter/roles",$user.roles).then(function (response) {
                        response.$request().$get("filters").then(function (resource) {
                            resource.forEach(filter => {
                                self.newTab = {
                                    label: filter.name,
                                    filter: {
                                        processes: filter.petriNets,
                                        transitions: filter.transitions
                                    }
                                };

                                self.addTab();
                            });
                        }, function () {
                            $log.debug("No filter resource found!");
                        });
                    },function () {
                        $snackbar.error("Failed to load role specific tabs!");
                    });

                }]);
    });
