define(['angular', '../modules/Main', '../modules/Workflow'], function (angular) {
    class Tab {
        constructor(index, useCase, $http, $snackbar, $dialog) {
            this.index = index;
            this.useCase = useCase;
            this.$http = $http;
            this.$snackbar = $snackbar;
            this.$dialog = $dialog;

            this.tasks = [];
            this.page = {};
            this.loading = false;
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
        }

        loadTasks(next) {
            if (this.page.totalElements === this.tasks.length || this.loading) return;
            const self = this;
            const url = next ? this.page.next : "/res/task/case";
            this.loading = true;
            this.$http.post(url, [this.useCase.stringId]).then(function (response) {
                self.page = Object.assign(self.page, response.page);
                response.$request().$get("tasks").then(function (resources) {
                    if (self.page.totalPages !== 1) {
                        self.page.last = response.$href("last");
                        if (url !== self.page.last)
                            self.page.next = response.$href("next");
                    }
                    if (next)
                        resources.forEach(r => self.tasks.push(r));
                    else
                        self.tasks = resources;
                    self.tasks.forEach(task => self.getStatus(task));
                    self.loading = false;
                }, function () {
                    self.$snackbar.error("Task resources was not found!");
                    self.page.last = undefined;
                    self.page.next = undefined;
                    self.tasks.splice(0, self.tasks.length);
                    self.loading = false;
                })
            }, function () {
                self.$snackbar.error("Failed to tasks for case " + self.useCase.title);
                self.loading = false;
            })
        }

        assignTask(task) {
            const self = this;
            this.$http.get(task.$href("assign")).then(function (response) {
                if (response.success){
                    self.tasks.splice(0,self.tasks.length);
                    self.loadTasks();
                }
                if (response.error) self.$snackbar.error(response.error);
            }, function () {
                self.$snackbar.error("Assigning task " + task.title + " failed");
            });
        }

        cancelTask(task) {
            const self = this;
            this.$http.get(task.$href("cancel")).then(function (response) {
                if (response.success) {
                    self.tasks.splice(0,self.tasks.length);
                    self.loadTasks();
                }
                if (response.error) self.$snackbar.error(response.error);
            }, function () {
                self.$snackbar.error("Canceling assignment of task " + task.title + " failed");
            });
        }

        taskFinish(task) {
            const self = this;
            this.$http.get(task.$href("finish")).then(function (response) {
                if (response.success) {
                    self.tasks.splice(0,self.tasks.length);
                    self.loadTasks();
                }
                if (response.error) self.$snackbar.show(response.error);
            }, function () {
                self.$snackbar.error("Finishing task " + task.title + " failed");
            });
        }

        /**
         * Check if are required fields are valid before finish task
         * @param task
         * @returns {boolean}
         */
        areFieldsValid(task) {
            let valid = task.data.every(item => {
                if (item.logic.required) {
                    if (item.type === 'file') {
                        if (item.newFile) return !!item.uploaded;
                        return !!item.newValue;
                    } else if (item.type === 'boolean') {
                        return true;
                    } else if (item.type === 'number') {
                        return item.newValue !== undefined && item.newValue !== null;
                    } else return !!item.newValue;
                } else return true;
            });
            if (!valid) {
                this.$snackbar.error("Not all required fields have values! Required fields are marked with asterisk (*)");
            }
            return valid;
        }

        finishTask(task) {
            if (!task.data) {
                this.loadTaskData(task, () => {
                    if (!task.data) {
                        this.taskFinish(task);
                    } else {
                        this.areFieldsValid(task);
                    }
                });
            } else {
                if (this.areFieldsValid(task)) {
                    this.saveData(task, success => {
                        if (success) this.taskFinish(task);
                    });
                }
            }
        }

        loadTaskData(task, callback) {
            if (task.data) {
                callback && callback();
                return;
            }
            const self = this;
            this.$http.get(task.$href("data")).then(function (response) {
                if (response.$response().data._embedded) {
                    task.data = [];
                    Object.keys(response.$response().data._embedded).forEach(function (item, index, array) {
                        response.$request().$get(item).then(function (resource) {
                            task.data = task.data.concat(resource);
                            task.data = task.data.map(function (item) {
                                item.newValue = Tab.parseDataValue(item.value, item.type, item);
                                item.changed = false;
                                // item.taskIndex = taskIndex;
                                callback && callback();
                                return item;
                            });
                            //TODO: 23/3/2017 check expansion footer rendering in PROD, if no problem found remove sleep
                            // $timeout(function () {
                            // }, 100);
                            if (index === array.length - 1) {
                                callback && callback();
                            }
                        });
                    });
                } else {
                    //self.$snackbar.error("No data for task " + task.visualId);
                    callback && callback();
                }
            }, function () {
                self.$snackbar.error("Data for " + task.visualId + " failed to load!");
                callback && callback();
            });
        }

        autoPlusLogic(fieldIndex, task) {
            const logic = task.data[fieldIndex].logic.autoPlus;
            const refField = task.data.find(item => item.objectId === logic.ref);
            if (!refField.newValue) return;

            let autoValue;
            if (refField.type === 'text') {
                autoValue = refField.newValue + logic.value;
            } else if (refField.type === 'number') {
                autoValue = refField.newValue + logic.value;
            } else if (refField.type === 'date') {
                const mode = logic.value.charAt(logic.value.length - 1);
                const addValue = parseInt(logic.value.substr(0, logic.value.length - 1));
                if (addValue === 'NaN') return;
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
                this.dataFieldChanged(task, fieldIndex);
                task.data[fieldIndex].newValue = autoValue;
            }
        }

        applyFieldLogic(field, index, task) {
            if (!field.logic) return;
            Object.keys(field.logic).forEach(item => {
                switch (item) {
                    case "autoPlus":
                        this.autoPlusLogic(index, task);
                        break;
                }
            });
        }

        saveData(task, callback) {
            if (!task.data) return;

            const dataFields = {};
            task.data.forEach((item, index) => {
                this.applyFieldLogic(item, index, task);
            });
            task.data.forEach(item => {
                if (item.changed) {
                    dataFields[item.objectId] = {
                        type: item.type,
                        value: Tab.formatDataValue(item.newValue, item.type)
                    };
                }
            });

            if (jQuery.isEmptyObject(dataFields)) {
                callback && callback(true);
                return;
            }

            const self = this;
            this.$http.post(task.$href("data-edit"), JSON.stringify(dataFields)).then(function (response) {
                task.data.forEach(function (item, index) {
                    if (item.changed) {
                        task.data[index].changed = false;
                    }
                });
                self.$snackbar.success("Data successfully saved");
                callback && callback(true);
            }, function () {
                self.$snackbar.error("Saving data has failed!");
                callback && callback(false);
            });
        }

        userFieldChoice(task, field, fieldIndex, user) {
            if (user) {
                const userNames = user.name.split(' ');
                task.data[fieldIndex].newValue = {
                    email: user.login,
                    name: userNames[0],
                    surname: userNames[1],
                    userProcessRoles: user.roles.map(role => {roleId: role})
                };

                this.dataFieldChanged(task, fieldIndex);
                this.saveData(task);
            } else {
                const self = this;
                this.$dialog.showByTemplate('assign_user', this, {task: Object.assign({fieldRoles: field.roles}, task)}).then(function (user) {
                    if (!user) return;
                    task.data[fieldIndex].newValue = user;

                    self.dataFieldChanged(task, fieldIndex);
                    self.saveData(task);
                }, function () {
                });
            }
        }

        static parseDataValue(value, type, item) {
            if (type === 'date') {
                if (value) return new Date(value.year, value.monthValue - 1, value.dayOfMonth);
                else return undefined;
            }
            if (type === 'user') {
                // if (value)
                //     item.user = {name: item.value[1], email: item.value[0]};
            }
            return value;
        }

        static formatDataValue(value, type) {
            if (!value) return null;
            if (type === 'date') {
                return value.getFullYear() + "-" + Tab.paddingZero((value.getMonth() + 1) + "") + "-" + Tab.paddingZero(value.getDate() + "");
            }
            if (type === 'user') {
                return value.email;
            }
            return value;
        }

        dataFieldChanged(task, fieldIndex) {
            task.data[fieldIndex].changed = true;
        };

        formatDate(date) {
            if (!date) return;
            return Tab.paddingZero(date.dayOfMonth) + "." + Tab.paddingZero(date.monthValue) + "." + date.year + " \n"
                + Tab.paddingZero(date.hour) + ":" + Tab.paddingZero(date.minute);
        }

        static paddingZero(text) {
            text = text.toString();
            return text.length <= 1 ? "0" + text : text;
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
            self.page = {};
            self.loading = false;
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

            self.searchCases = function (next) {
                if (self.page.totalElements === self.cases.length || self.loading) return;
                const url = next ? self.page.next : "/res/workflow/case/search";
                self.loading = true;
                $http.post(url, self.filter.filter).then(function (response) {
                    self.page = Object.assign(self.page, response.page);
                    response.$request().$get("cases").then(function (resources) {
                        if (self.page.totalPages !== 1) {
                            self.page.last = response.$href("last");
                            if (url !== self.page.last)
                                self.page.next = response.$href("next");
                        }
                        if (next)
                            resources.forEach(r => self.cases.push(r));
                        else
                            self.cases = resources;
                        self.loading = false;
                    }, function () {
                        $snackbar.error("No resource for cases was found!");
                        self.page.last = undefined;
                        self.page.next = undefined;
                        self.cases.splice(0, self.cases.length);
                        self.loading = false;
                    });
                }, function () {
                    $snackbar.error("Getting cases failed!");
                    self.loading = false;
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
                    self.tabs.push(new Tab(self.tabs.length, useCase, $http, $snackbar, $dialog));
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
                            if (response.success) {
                                $dialog.closeCurrent();
                                self.newCase = {};
                                self.cases.splice(0,self.cases.length);
                                self.searchCases();
                            }
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