define(['jquery', 'angular', '../classes/Task', "../classes/DataField", '../modules/Main', 'angularMaterialExpansionPanels'],
    function (jQuery, angular, Task, DataField) {
        angular.module('ngMain').controller('TaskPanelController',
            ['$log', '$scope', '$http', '$snackbar', '$user', '$dialog', '$fileUpload', '$timeout', '$mdExpansionPanel', 'resource', 'links', 'tab', 'config', '$i18n',
                function ($log, $scope, $http, $snackbar, $user, $dialog, $fileUpload, $timeout, $mdExpansionPanel, resource, links, tab, config, $i18n) {
                    /*--- Constants --*/
                    const self = this;
                    const PANEL_ANIMATION_DURATION = 300;
                    const STATUS_DONE = "Done";
                    const STATUS_ASSIGNED = "Assigned";
                    const STATUS_NEW = "New";

                    /*--- Enumeration ---*/
                    self.ASSIGN_POLICY = {
                        manual: "MANUAL",
                        auto: "AUTO"
                    };
                    self.DATA_FOCUS_POLICY = {
                        manual: "MANUAL",
                        autoRequired: "AUTO_EMPTY_REQUIRED"
                    };

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
                    self.dates = resolveDate;
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
                    self.focusNext = focusNearestRequiredField;

                    /*--- Shortcut Methods --*/
                    self.getData = () => self.dataGroups.reduce((data, group) => data.concat(group.data), []);
                    self.showDataGroupDivider = group => group.title && group.data.some(d => !d.behavior.hidden);
                    self.reload = () => {
                        self.tab.reload();
                        self.tab.reloadUseCase();
                    };
                    self.nextChain = (callChain = {}) => resolveCallChainObject(callChain, true);

                    /*--- Methods implementation --*/
                    function resolveCallChainObject(callChain = {}, result) {
                        const resolveBranch = branch => {
                            const executeChainBlock = block => {
                                if (block.run && block.args) {
                                    const that = block.self ? block.self : self;
                                    block.run.apply(that, block.args);
                                }
                            };

                            if (branch instanceof Array)
                                branch.forEach(block => executeChainBlock(block));
                            else if (branch instanceof Object)
                                executeChainBlock(branch);
                        };

                        if (result && callChain.success)
                            resolveBranch(callChain.success);
                        else if (!result && callChain.failure)
                            resolveBranch(callChain.failure);
                        else if (callChain.default)
                            resolveBranch(callChain.default);
                    }

                    function resolveStatus() {
                        if (self.user && self.finishDate)
                            return STATUS_DONE;
                        if (self.user && !self.finishDate && self.startDate)
                            return STATUS_ASSIGNED;
                        return STATUS_NEW;
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

                    function resolveDate() {
                        const status = self.status();
                        switch (status) {
                            case STATUS_NEW:
                                self.formatedStartDate = undefined;
                                break;
                            case STATUS_ASSIGNED:
                                self.formatedStartDate = formatDate(self.startDate);
                                break;
                            case STATUS_DONE:
                                self.formatedStartDate = undefined;
                                break;
                        }
                    }

                    function assignTask(callChainObject = {}) {
                        if (self.user) {
                            resolveCallChainObject(callChainObject, true);
                            return;
                        }
                        self.loading = true;
                        $http.get(self.links.assign.href).then(response => {
                            self.loading = false;
                            if (response.success)
                                resolveCallChainObject(callChainObject, true);
                            else if (response.error) {
                                $snackbar.error(response.error);
                                resolveCallChainObject(callChainObject, false);
                            }
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.assigningTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                            $log.debug(error);
                            self.loading = false;
                            resolveCallChainObject(callChainObject, false);
                        });
                    }

                    function delegateTask(callChainObject = {}) {
                        $dialog.showByTemplate('assign_user', self, {task: Object.assign(self, {fieldRoles: Object.keys(self.roles)})})
                            .then(user => {
                                if (!user)
                                    return;
                                $http.post(self.links.delegate.href, user.email).then(response => {
                                    if (response.success) {
                                        resolveCallChainObject(callChainObject, true);
                                    } else if (response.error) {
                                        $snackbar.error(response.error);
                                        resolveCallChainObject(callChainObject, false);
                                    }
                                }, () => {
                                    $snackbar.error(`${$i18n.block.snackbar.delegatingTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                                    resolveCallChainObject(callChainObject, false);
                                });
                            }, angular.noop);
                    }

                    function cancelTask(callChainObject = {}) {
                        if (!self.user || self.user.email !== $user.login) {
                            resolveCallChainObject(callChainObject, false);
                            return;
                        }
                        $http.get(self.links.cancel.href).then(response => {
                            if (response.success) {
                                self.user = undefined;
                                self.startDate = undefined;
                                self.finishDate = undefined;
                                self.formatedStartDate = undefined;
                                self.formatedFinishDate = undefined;
                                resolveCallChainObject(callChainObject, true);
                            } else if (response.error) {
                                $snackbar.error(response.error);
                                resolveCallChainObject(callChainObject, false);
                            }
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.cancelingAssignmentOfTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                            resolveCallChainObject(callChainObject, false);
                        });
                    }

                    function sendFinishTaskRequest(callChainObject = {}) {
                        $http.get(links.finish.href).then(response => {
                            if (response.success) {
                                resolveCallChainObject(callChainObject, true);
                            } else if (response.error) {
                                $snackbar.error(response.error);
                                resolveCallChainObject(callChainObject, false);
                            }
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.finishingTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                            resolveCallChainObject(callChainObject, false);
                        });
                    }

                    function finishTask(callChainObject = {}) {
                        if (self.dataSize <= 0) {
                            self.load({
                                default: {
                                    run: () => {
                                        if (self.dataSize <= 0 || self.validate()) {
                                            sendFinishTaskRequest(callChainObject);
                                            self.collapse();
                                        }
                                    },
                                    args: []
                                }
                            });
                        } else {
                            if (self.validate()) {
                                self.save({
                                    success: {
                                        run: () => {
                                            sendFinishTaskRequest(callChainObject);
                                            self.collapse();
                                        },
                                        args: []
                                    }
                                });
                            }
                        }
                    }

                    function loadTaskData(callChainObject = {}) {
                        if (self.dataSize > 0) {
                            resolveCallChainObject(callChainObject, true);
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
                                            resolveCallChainObject(callChainObject, true);
                                        }
                                    } else {
                                        $log.info(`No data for task ${self.title}`);
                                        self.loading = false;
                                        resolveCallChainObject(callChainObject, true);
                                    }
                                });
                            }, () => {
                                $log.info(`No data group for task ${self.title}`);
                                self.loading = false;
                                resolveCallChainObject(callChainObject, true);
                            });
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.dataFor} ${self.title} ${$i18n.block.snackbar.failedToLoad}`);
                            $log.debug(error);
                            self.loading = false;
                            resolveCallChainObject(callChainObject, false);
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

                    function saveTaskData(callChainObject = {}) {
                        if (self.dataSize <= 0)
                            return;

                        const fields = {};
                        const taskData = self.getData();
                        if(jQuery.isEmptyObject(callChainObject)){
                            callChainObject = self.dataFocusPolicyCallChain;
                        }
                        taskData.forEach(field => {
                            if (field.changed) {
                                const change = field.save();
                                if (change)
                                    fields[field.stringId] = change;
                            }
                        });
                        if (Object.keys(fields).length === 0) {
                            resolveCallChainObject(callChainObject, true);
                            return;
                        }

                        $http.post(self.links["data-edit"].href, JSON.stringify(fields)).then(response => {
                            self.tab.updateTasksData(response.changedFields);
                            Object.keys(fields).forEach(id => taskData.find(f => f.stringId === id).changed = false);
                            $snackbar.success($i18n.block.snackbar.dataSavedSuccessfully);
                            resolveCallChainObject(callChainObject, true);
                        }, error => {
                            $snackbar.error($i18n.block.snackbar.savingDataFailed);
                            $log.debug(error);
                            resolveCallChainObject(callChainObject, false);
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
                        self.dates();
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
                        // self.expanded ? self.collapse() : self.expand();
                        resolveCallChainObject(self.assignPolicyCallChain, !self.expanded);
                        preventEventDefault(event);
                    }

                    function expandTaskPanel(callChainObject = {}) {
                        self.animating = true;
                        self.panel.expand();
                        self.expanded = true;
                        $timeout(() => {
                            self.animating = false;
                            resolveCallChainObject(callChainObject, true)
                        }, PANEL_ANIMATION_DURATION);
                    }

                    function collapseTaskPanel(callChainObject = {}) {
                        self.animating = true;
                        self.panel.collapse();
                        self.expanded = false;
                        $timeout(() => {
                            self.animating = false;
                            resolveCallChainObject(callChainObject, true);
                        }, PANEL_ANIMATION_DURATION);
                    }

                    function focusNearestRequiredField(callChainObject = {}) {
                        // const taskElement = $("#task-"+this.stringId);
                        // taskElement.focus();
                        // taskElement.blur();
                        //window.focus();
                        //window.blur();

                        const movedToNext = self.getData().some(data => {
                            if (data.behavior.required && data.newValue && data.element && data.element.is(":focus"))
                                data.element.blur();

                            if (data.behavior.required && !data.newValue &&
                                data.type !== 'boolean' &&
                                data.type !== 'file' &&
                                data.type !== 'user' &&
                                data.element) {

                                if(data.type === 'text' || data.type === 'number'){
                                    data.element.click();
                                    data.element.focus();
                                }
                                else {
                                    // data.element.focus();
                                    data.element.click();
                                }

                                return true;
                            }
                        });
                        resolveCallChainObject(callChainObject, movedToNext);
                    }

                    function buildAssignPolicyCallChain() {
                        const chain = {};
                        switch (self.assignPolicy) {
                            case self.ASSIGN_POLICY.manual:
                                chain.success = {
                                    run: self.load,
                                    args: [{
                                        success: {
                                            run: self.expand,
                                            args: [self.dataFocusPolicyCallChain]
                                        }
                                    }]
                                };
                                chain.failure = {
                                    run: self.collapse,
                                    args: []
                                };
                                break;
                            case self.ASSIGN_POLICY.auto:
                                chain.success = {
                                    run: self.assign,
                                    args: [{
                                        success: [
                                            {
                                                run: self.tab.load,
                                                self: self.tab,
                                                args: [false, true]
                                            },
                                            {
                                                run: self.load,
                                                args: [{
                                                    success: {
                                                        run: self.expand,
                                                        args: [self.dataFocusPolicyCallChain]
                                                    }
                                                }]
                                            }
                                        ]
                                    }]
                                };
                                chain.failure = {
                                    run: self.cancel,
                                    args: [{
                                        success: [
                                            {
                                                run: self.tab.load,
                                                self: self.tab,
                                                args: [false, true]
                                            },
                                            {
                                                run: self.nextChain,
                                                args: [{
                                                    default: {
                                                        run: self.collapse,
                                                        args: []
                                                    }
                                                }]
                                            }
                                        ]
                                    }]
                                };
                                break;
                            default:
                                break;
                        }

                        return chain;
                    }

                    function buildDataFocusPolicyCallChain() {
                        const chain = {};
                        switch (self.dataFocusPolicy) {
                            case self.DATA_FOCUS_POLICY.manual:
                                break;
                            case self.DATA_FOCUS_POLICY.autoRequired:
                                chain.success = {
                                    run: self.focusNext,
                                    args: []
                                };
                                break;
                            default:
                                break;
                        }

                        return chain;
                    }


                    /*-- Init --*/
                    $scope.disableNestedClick = preventEventDefault;
                    self.update(resource, links);
                    self.tab.addTaskController(self);
                    self.dataFocusPolicyCallChain = buildDataFocusPolicyCallChain();
                    self.assignPolicyCallChain = buildAssignPolicyCallChain();
                }]);

    });
