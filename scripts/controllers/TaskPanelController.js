define(['angular', '../classes/Task', "../classes/DataField", '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, Task, DataField) {
        angular.module('ngMain').controller('TaskPanelController',
            ['$log', '$scope', '$http', '$snackbar', '$user', '$dialog', '$fileUpload', '$timeout', '$mdExpansionPanel', 'resource', 'links', 'tab', 'config', '$i18n',
                function ($log, $scope, $http, $snackbar, $user, $dialog, $fileUpload, $timeout, $mdExpansionPanel, resource, links, tab, config, $i18n) {
                    /*--- Constants --*/
                    const self = this;
                    const PANEL_ANIMATION_DURATION = 300;

                    /*--- Variables ---*/
                    self.links = links;
                    self.tab = tab;
                    self.panel = undefined;
                    self.dataGroups = [];
                    self.dataSize = 0;
                    self.expanded = false;
                    self.loading = false;
                    self.animating = false;

                    /*--- Methods definition ---*/
                    self.status = resolveStatus;
                    self.icons = resolveIcons;
                    self.assign = assignTask;
                    self.delegate = delegateTask;
                    self.cancel = cancelTask;
                    self.finish = finishTask;
                    self.load = loadTaskData;
                    self.save = saveTaskData;
                    self.updateDataGroups = updateTaskData;
                    self.update = updateTask;
                    self.validate = validateTaskData;
                    self.click = clickOnTaskHeader;
                    self.expand = expandTaskPanel;
                    self.collapse = collapseTaskPanel;

                    /*--- Shortcut Methods --*/
                    self.getData = () => self.dataGroups.reduce((data, group) => data.concat(group.data), []);
                    self.showDataGroupDivider = group => group.title && group.data.some(d => !d.behavior.hidden);
                    self.reload = () => {
                        self.tab.reload();
                        self.tab.reloadUseCase();
                    };

                    /*--- Methods implementation --*/
                    function callCallbackWithResult(callbackObj = {}, operationResult) {
                        if (operationResult && callbackObj.success)
                            callbackObj.success();
                        else if (!operationResult && callbackObj.failure)
                            callbackObj.failure();
                        else if (callbackObj.default)
                            callbackObj.default();
                    }

                    function resolveStatus() {
                        if (self.user && self.finishDate) return "Done";
                        if (self.user && !self.finishDate && self.startDate) return "Assigned";
                        return "New";
                    }

                    function resolveIcons() {
                        if (self.icon)
                            return self.icon.split(" ");
                        if (self.tab.useCase && self.tab.useCase.icon)
                            return [self.tab.useCase.icon];
                        return ['label'];
                    }

                    function formatDate(date) {
                        if (!date)
                            return undefined;
                        if (date instanceof Date)
                            return `${DataField.padding(date.getDate(), 0)}.${DataField.padding(date.getMonth() + 1, 0)}. ${date.getFullYear()}`;

                        return `${DataField.padding(date.dayOfMonth, 0)}.${DataField.padding(date.monthValue, 0)}.${date.year}
                                ${DataField.padding(date.hour, 0, 0)}:${DataField.padding(date.minute, 0, 0)}`;
                    }

                    function assignTask(callback = {}) {
                        if (self.user) {
                            callCallbackWithResult(callback, false);
                            return;
                        }
                        $http.get(self.links.assign.href).then(response => {
                            if (response.success)
                                callCallbackWithResult(callback, true);
                            else if (response.error) {
                                $snackbar.error(response.error);
                                callCallbackWithResult(callback, false);
                            }
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.assigningTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                            $log.debug(error);
                            callCallbackWithResult(callback, false);
                        });
                    }

                    function delegateTask(callback = {}) {
                        $dialog.showByTemplate('assign_user', self, {task: Object.assign(self, {fieldRoles: Object.keys(self.roles)})})
                            .then(user => {
                                if (!user)
                                    return;
                                $http.post(self.links.delegate.href, user.email).then(response => {
                                    if (response.success) {
                                        callCallbackWithResult(callback, true);
                                    } else if (response.error) {
                                        $snackbar.error(response.error);
                                        callCallbackWithResult(callback, false);
                                    }
                                }, () => {
                                    $snackbar.error(`${$i18n.block.snackbar.delegatingTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                                    callCallbackWithResult(callback, false);
                                });
                            }, angular.noop);
                    }

                    function cancelTask(callback = {}) {
                        if (!self.user || self.user.email !== $user.login) {
                            callCallbackWithResult(callback, false);
                            return;
                        }
                        $http.get(self.links.cancel.href).then(response => {
                            if (response.success) {
                                self.user = undefined;
                                self.startDate = undefined;
                                self.finishDate = undefined;
                                self.formatedStartDate = undefined;
                                self.formatedFinishDate = undefined;
                                callCallbackWithResult(callback, true);
                            } else if (response.error) {
                                $snackbar.error(response.error);
                                callCallbackWithResult(callback, false);
                            }
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.cancelingAssignmentOfTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                            callCallbackWithResult(callback, false);
                        });
                    }

                    function sendFinishTaskRequest(callback = {}) {
                        $http.get(links.finish.href).then(response => {
                            if (response.success) {
                                callCallbackWithResult(callback, true);
                            } else if (response.error) {
                                $snackbar.error(response.error);
                                callCallbackWithResult(callback, false);
                            }
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.finishingTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                            callCallbackWithResult(callback, false);
                        });
                    }

                    function finishTask(callback = {}) {
                        if (self.dataSize <= 0) {
                            self.load({
                                default: () => {
                                    if (self.dataSize <= 0 || self.validate()) {
                                        sendFinishTaskRequest(callback);
                                        self.collapse();
                                    }
                                }
                            });
                        } else {
                            if (self.validate()) {
                                self.save({
                                    success: () => {
                                        sendFinishTaskRequest(callback);
                                        self.collapse();
                                    }
                                });
                            }
                        }
                    }

                    function loadTaskData(callback = {}) {
                        if (self.dataSize > 0) {
                            callCallbackWithResult(callback, true);
                            return;
                        }
                        self.loading = true;
                        $http.get(self.links.data.href).then(response => {
                            response.$request().$get("dataGroups").then(groupResources => {
                                groupResources.forEach((group, index, array) => {
                                    if (group.fields._embedded) {
                                        group.data = [];
                                        Object.keys(group.fields._embedded).forEach(item => {
                                            group.data = group.fields._embedded[item]
                                                .map(r => new DataField(self, r, group.fields._links, {
                                                    $dialog: $dialog,
                                                    $snackbar: $snackbar,
                                                    $user: $user,
                                                    $fileUpload: $fileUpload,
                                                    $i18n: $i18n
                                                })).concat(group.data);
                                        });
                                        delete group.fields;
                                        self.dataGroups.push(group);
                                        self.dataSize += group.data.length;
                                        if (index === array.length - 1) {
                                            self.dataGroups.forEach(group => {
                                                group.data.sort((a, b) => a.order - b.order);
                                            });
                                            self.loading = false;
                                            callCallbackWithResult(callback, true);
                                        }
                                    } else {
                                        $log.info(`No data for task ${self.title}`);
                                        self.loading = false;
                                        callCallbackWithResult(callback, true);
                                    }
                                });
                            }, () => {
                                $log.info(`No data group for task ${self.title}`);
                                self.loading = false;
                                callCallbackWithResult(callback, true);
                            });
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.dataFor} ${self.title} ${$i18n.block.snackbar.failedToLoad}`);
                            $log.debug(error);
                            self.loading = false;
                            callCallbackWithResult(callback, false);
                        });
                    }

                    function validateTaskData() {
                        let valid = true;
                        self.getData().forEach(field => {
                            if (field.behavior.required || field.newValue)
                                valid = field.isValid() ? valid : false;
                        });
                        if (!valid)
                            $snackbar.error($i18n.block.snackbar.fieldsHaveInvalidValues);
                        return valid;
                    }

                    function saveTaskData(callback = {}) {
                        if (self.dataSize <= 0)
                            return;

                        const fields = {};
                        const taskData = self.getData();
                        taskData.forEach(field => {
                            if (field.changed) {
                                const change = field.save();
                                if (change)
                                    fields[field.stringId] = change;
                            }
                        });
                        if (Object.keys(fields).length === 0) {
                            callCallbackWithResult(callback, true);
                            return;
                        }

                        $http.post(self.links["data-edit"].href, JSON.stringify(fields)).then(response => {
                            self.tab.updateTasksData(response.changedFields);
                            Object.keys(fields).forEach(id => taskData.find(f => f.stringId === id).changed = false);
                            $snackbar.success($i18n.block.snackbar.dataSavedSuccessfully);
                            callCallbackWithResult(callback, true);
                        }, error => {
                            $snackbar.error($i18n.block.snackbar.savingDataFailed);
                            $log.debug(error);
                            callCallbackWithResult(callback, false);
                        });
                    }

                    function updateTaskData(updatedObj) {
                        if (!jQuery.isEmptyObject(updatedObj)) {
                            self.getData().forEach(field => {
                                if (updatedObj[field.stringId]) {
                                    const updatedField = updatedObj[field.stringId];
                                    Object.keys(updatedField).forEach(key => {
                                        if (key === 'value')
                                            field.newValue = field.parse(updatedField[key]);
                                        else if (key === 'behavior' && updatedField.behavior[self.transitionId])
                                            field.behavior = updatedField.behavior[self.transitionId];
                                        else
                                            field[key] = updatedField[key];
                                    });
                                }
                            });
                        }
                    }

                    function updateTask(resource, links) {
                        Object.assign(self, resource, config);
                        self.links = links;
                        self.formatedStartDate = formatDate(self.startDate);
                        self.formatedFinishDate = formatDate(self.finishDate);
                    }

                    function preventEventDefault(event) {
                        if (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }

                    function clickOnTaskHeader(event) {
                        if (self.loading || self.animating) {
                            preventEventDefault(event);
                            return;
                        }
                        self.expanded ? self.collapse() : self.expand();
                        preventEventDefault(event);
                    }

                    function expandTaskPanel(before = angular.noop, after = angular.noop) {
                        before();
                        self.load({
                            success: () => {
                                self.animating = true;
                                self.panel.expand();
                                self.expanded = true;
                                $timeout(() => {
                                    self.animating = false;
                                    after();
                                }, PANEL_ANIMATION_DURATION);
                            }
                        });
                    }

                    function collapseTaskPanel(before = angular.noop, after = angular.noop) {
                        before();
                        self.animating = true;
                        self.panel.collapse();
                        self.expanded = false;
                        $timeout(() => {
                            self.animating = false;
                            after();
                        }, PANEL_ANIMATION_DURATION);
                    }


                    /*-- Init --*/
                    $scope.disableNestedClick = preventEventDefault;
                    self.update(resource, links);
                    self.tab.addTaskController(self);
                }]);

    });
