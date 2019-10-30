define(['jquery', 'angular', "../classes/DataField", '../modules/Main', 'angularMaterialExpansionPanels'],
    function (jQuery, angular, DataField) {
        angular.module('ngMain')
            .filter('currencyFormat', ['$rootScope', '$filter', 'currencyFormatService', function ($rootScope, $filter, currencyFormatService) {

                /**
                 * Transforms an amount into the right format and currency according to a passed currency code (3 chars).
                 *
                 * @param float amount
                 * @param string currencyCode e.g. EUR, USD
                 * @param number fractionSize User specified fraction size that overwrites default value
                 * @param boolean useUniqSymbol use unique currency symbol
                 * @param string localeId e.g. ru_RU, default en_US
                 * @param boolean onlyAmount Retrieve amount only
                 * @return string
                 */
                return function (amount, currencyCode, fractionSize = null, useUniqSymbol = true, localeId = null, onlyAmount = false) {
                    if (!currencyCode || Number(amount) != amount) {
                        return;
                    }

                    var formattedCurrency,
                        currency = currencyFormatService.getByCode(currencyCode),
                        formatedAmount = Math.abs(amount),
                        signAmount = amount < 0 ? '-' : '',
                        rtl = false;

                    // Fraction size

                    var currentFractionSize = currency.fractionSize;
                    if (fractionSize !== null) {
                        currentFractionSize = fractionSize;
                    }

                    formatedAmount = formatedAmount.toFixed(currentFractionSize);

                    // Format numeral by locale ID

                    localeId = localeId ? localeId : ($rootScope.currencyLanguage || 'en_US');
                    var languageOptions = currencyFormatService.getLanguageByCode(localeId);

                    formatedAmount = formatedAmount.split('.').join(languageOptions.decimal);
                    formatedAmount = formatedAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languageOptions.thousands);

                    // Format currency

                    if (onlyAmount) {
                        formattedCurrency = signAmount + formatedAmount;
                    } else if (!!currency && !useUniqSymbol && !!currency.symbol && !!currency.symbol.template) {
                        formattedCurrency = currency.symbol.template.replace('1', formatedAmount);
                        formattedCurrency = formattedCurrency.replace('$', currency.symbol.grapheme);
                        formattedCurrency = signAmount + formattedCurrency;
                    }
                    else if (!!currency && !!useUniqSymbol && !!currency.uniqSymbol && !!currency.uniqSymbol.template) {
                        formattedCurrency = currency.uniqSymbol.template.replace('1', formatedAmount);
                        formattedCurrency = formattedCurrency.replace('$', currency.uniqSymbol.grapheme);
                        formattedCurrency = signAmount + formattedCurrency;
                    }
                    else {
                        formattedCurrency = signAmount + formatedAmount + ' ' + currencyCode;
                    }

                    return formattedCurrency;
                };
            }])
            .controller('TaskPanelController',
            ['$log', '$scope', '$http', '$snackbar', '$user', '$dialog', '$fileUpload', '$timeout', '$mdExpansionPanel', 'resource', 'links', 'tab', 'config', '$i18n',
                function ($log, $scope, $http, $snackbar, $user, $dialog, $fileUpload, $timeout, $mdExpansionPanel, resource, links, tab, config, $i18n) {
                    //Config - fullReload, allowHighlight

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
                    self.FINISH_POLICY = {
                        manual: "MANUAL",
                        autoNoData: "AUTO_NO_DATA"
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
                    self.valid = true;

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
                    self.createReloadChain = () => {
                        return new Chain([
                            () => {
                                if (self.fullReload)
                                    self.reload();
                                else
                                    self.tab.load(false, true);
                                self.tab.reloadUseCase();
                            }
                        ])
                    };

                    self.getAssignTitle = function () {
                        if (self.assignTitle)
                            return self.assignTitle;
                        return $i18n.block.btn.assign;
                    };
                    self.getFinishTitle = function () {
                        if (self.finishTitle)
                            return self.finishTitle;
                        return $i18n.block.btn.finish;
                    };
                    self.getCancelTitle = function () {
                        if (self.cancelTitle)
                            return self.cancelTitle;
                        return $i18n.block.btn.cancel;
                    };
                    self.getDelegateTitle = function () {
                        if (self.delegateTitle)
                            return self.delegateTitle;
                        return $i18n.block.btn.delegate;
                    };

                    /*--- Inner objects ---*/
                    function Chain(success = [], failure = [], always = []) {
                        this.success = success;
                        this.failure = failure;
                        this.always = always;
                    }

                    Chain.prototype.run = function (success) {
                        if (success)
                            this.success.forEach(c => c(true));
                        else
                            this.failure.forEach(c => c(false));
                        this.always.forEach(c => c());
                    };

                    /*--- Methods implementation --*/
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

                        return `${DataField.padding(date[2], 0)}.${DataField.padding(date[1], 0)}.${date[0]}
                                ${DataField.padding(date[3], 0, 0)}:${DataField.padding(date[4], 0, 0)}`;
                    }

                    function resolveDate() {
                        const status = self.status();
                        switch (status) {
                            case STATUS_NEW:
                                // self.formatedStartDate = undefined;
                                break;
                            case STATUS_ASSIGNED:
                                self.formatedStartDate = formatDate(self.startDate);
                                break;
                            case STATUS_DONE:
                                self.formatedStartDate = formatDate(self.startDate);
                                self.formatedFinishDate = formatDate(self.finishDate);
                                break;
                        }
                    }

                    function removeStateData() {
                        self.user = undefined;
                        self.startDate = undefined;
                        self.formatedStartDate = undefined;
                        self.finishDate = undefined;
                        self.formatedFinishDate = undefined;
                    }

                    function assignTask(callChain = new Chain()) {
                        if (self.loading)
                            return;
                        if (self.user) {
                            callChain.run(true);
                            return;
                        }
                        self.loading = true;
                        $http.get(self.links.assign.href).then(response => {
                            self.loading = false;
                            if (response.success) {
                                removeStateData();
                                callChain.run(true);
                            }
                            else if (response.error) {
                                $snackbar.error(response.error);
                                callChain.run(false);
                            }
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.assigningTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                            $log.debug(error);
                            self.loading = false;
                            callChain.run(false);
                        });
                    }

                    function delegateTask(callChain = new Chain()) {
                        if (self.loading)
                            return;
                        $dialog.showByTemplate('assign_user', self, {task: Object.assign(self, {fieldRoles: Object.keys(self.roles)})})
                            .then(user => {
                                if (!user)
                                    return;
                                self.loading = true;
                                $http.post(self.links.delegate.href, user.id).then(response => {
                                    self.loading = false;
                                    if (response.success) {
                                        removeStateData();
                                        callChain.run(true);
                                    } else if (response.error) {
                                        $snackbar.error(response.error);
                                        callChain.run(false);
                                    }
                                }, () => {
                                    $snackbar.error(`${$i18n.block.snackbar.delegatingTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                                    self.loading = false;
                                    callChain.run(false);
                                });
                            }, angular.noop);
                    }

                    function cancelTask(callChain = new Chain()) {
                        if (self.loading)
                            return;
                        if (!self.user || ((self.user.email !== $user.login) && !$user.canDo(self.roles, 'cancel')) ) {
                            callChain.run(false);
                            return;
                        }
                        self.loading = true;
                        $http.get(self.links.cancel.href).then(response => {
                            self.loading = false;
                            if (response.success) {
                                removeStateData();
                                callChain.run(true);
                            } else if (response.error) {
                                $snackbar.error(response.error);
                                callChain.run(false);
                            }
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.cancelingAssignmentOfTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                            self.loading = false;
                            callChain.run(false);
                        });
                    }

                    function sendFinishTaskRequest(callChain = new Chain()) {
                        if (self.loading)
                            return;
                        self.loading = true;
                        $http.get(links.finish.href).then(response => {
                            self.loading = false;
                            if (response.success) {
                                removeStateData();
                                callChain.run(true);
                            } else if (response.error) {
                                $snackbar.error(response.error);
                                callChain.run(false);
                            }
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.finishingTask} ${self.title} ${$i18n.block.snackbar.failed}`);
                            self.loading = false;
                            callChain.run(false);
                        });
                    }

                    function finishTask(callChain = new Chain()) {
                        if (self.dataSize <= 0) {
                            self.load(new Chain([], [], [
                                () => {
                                    if (self.dataSize <= 0 || self.validate()) {
                                        sendFinishTaskRequest(callChain);
                                        self.collapse();
                                    }
                                }
                            ]));
                        } else {
                            if (self.validate()) {
                                self.save(new Chain([
                                    () => {
                                        sendFinishTaskRequest(callChain);
                                        self.collapse();
                                    }
                                ]));
                            }
                        }
                    }

                    function loadTaskData(callChain = new Chain()) {
                        if (self.dataSize > 0) {
                            callChain.run(true);
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
                                                    $dialog,
                                                    $snackbar,
                                                    $user,
                                                    $fileUpload,
                                                    $i18n,
                                                    $timeout
                                                })).concat(group.data);
                                        });
                                        delete group.fields;
                                        self.dataGroups.push(group);
                                        self.dataSize += group.data.length;
                                    } else {
                                        $log.info(`No data for task ${self.title}`);
                                        self.loading = false;
                                        callChain.run(true);
                                    }
                                });
                                self.dataGroups.forEach(group => {
                                    group.data.sort((a, b) => a.order - b.order);
                                });
                                self.loading = false;
                                callChain.run(true);
                                preValidate();
                            }, () => {
                                $log.info(`No data group for task ${self.title}`);
                                self.loading = false;
                                callChain.run(true);
                            });
                        }, error => {
                            $snackbar.error(`${$i18n.block.snackbar.dataFor} ${self.title} ${$i18n.block.snackbar.failedToLoad}`);
                            $log.debug(error);
                            self.loading = false;
                            callChain.run(false);
                        });
                    }

                    function preValidate() {
                        let valid = true;
                        self.getData().forEach(field => {
                            if (field.behavior.required || field.newValue)
                                valid = field.isValid() ? valid : false;
                        });
                        // self.valid = valid;
                        return valid;
                    }

                    function validateTaskData() {
                        let valid = preValidate();
                        if (!valid)
                            $snackbar.error($i18n.block.snackbar.fieldsHaveInvalidValues);
                        return valid;
                    }

                    function saveTaskData(callChain = new Chain()) {
                        if (self.dataSize <= 0)
                            return;

                        const fields = {};
                        const taskData = self.getData();
                        if (callChain.success.length === 0)
                            callChain.success = buildDataFocusPolicyCallChain(true);
                        if (callChain.failure.length === 0)
                            callChain.failure = buildDataFocusPolicyCallChain(false);

                        taskData.forEach(field => {
                            if (field.changed) {
                                const change = field.save();
                                if (change)
                                    fields[field.stringId] = change;
                            }
                        });
                        if (Object.keys(fields).length === 0) {
                            callChain.run(true);
                            return;
                        }

                        self.loading = true;
                        $http.post(self.links["data-edit"].href, JSON.stringify(fields)).then(response => {
                            self.tab.updateTasksData(response.changedFields);
                            Object.keys(fields).forEach(id => taskData.find(f => f.stringId === id).changed = false);
                            $snackbar.success($i18n.block.snackbar.dataSavedSuccessfully);
                            self.loading = false;
                            callChain.run(true);
                        }, error => {
                            $snackbar.error($i18n.block.snackbar.savingDataFailed);
                            $log.debug(error);
                            self.loading = false;
                            callChain.run(false);
                            self.reload();
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

                        self.callChain.run(!self.expanded);
                        preventEventDefault(event);
                    }

                    function expandTaskPanel(callChain = new Chain()) {
                        self.animating = true;
                        self.panel.expand();
                        self.expanded = true;
                        $timeout(() => {
                            self.animating = false;
                            callChain.run(true);
                        }, PANEL_ANIMATION_DURATION);
                    }

                    function collapseTaskPanel(callChain = new Chain()) {
                        self.animating = true;
                        self.panel.collapse();
                        self.expanded = false;
                        $timeout(() => {
                            self.animating = false;
                            callChain.run(true);
                        }, PANEL_ANIMATION_DURATION);
                    }

                    function focusNearestRequiredField(callChain = new Chain()) {
                        // const taskElement = $("#task-"+this.stringId);
                        // taskElement.focus();
                        // taskElement.blur();
                        return; //temp disabled

                        window.focus();
                        window.blur();

                        const movedToNext = self.getData().some(data => {
                            if (data.behavior.required && data.newValue && data.element && data.element.is(":focus"))
                                data.element.blur();

                            if (data.behavior.required && !data.newValue &&
                                data.type !== 'boolean' &&
                                data.type !== 'file' &&
                                data.type !== 'user' &&
                                data.element) {

                                if (data.type === 'text' || data.type === 'number') {
                                    data.element.click();
                                    data.element.focus();
                                } else if (data.type === 'enumeration' || data.type === 'multichoice' || data.type === 'date') {
                                    data.element.focus();
                                } else {
                                    // data.element.focus();
                                    data.element.click();
                                }

                                return true;
                            }
                        });

                        callChain.run(movedToNext);
                    }

                    function manualAssignPolicy(success) {
                        if (success) {
                            return [() => {
                                self.load(new Chain(buildFinishPolicyCallChain(true)));
                            }];
                        } else {
                            return [() => {
                                self.collapse();
                            }];
                        }
                    }

                    function autoAssignPolicy(success) {
                        if (success) {
                            return [() => {
                                self.assign(new Chain([
                                        () => {
                                            self.tab.load(false, true);
                                        },
                                        () => {
                                            self.load(new Chain(buildFinishPolicyCallChain(true)));
                                        }
                                    ],
                                    [
                                        () => {
                                            self.tab.load(false, true);
                                        }
                                    ]));
                            }];
                        } else {
                            return [() => {
                                self.cancel(new Chain([
                                    () => {
                                        self.tab.load(false, true);
                                    },
                                    () => {
                                        self.collapse();
                                    }
                                ], [
                                    () => {
                                        self.tab.load(false, true);
                                    },
                                    () => {
                                        self.collapse();
                                    }
                                ]))
                            }];
                        }
                    }

                    function buildAssignPolicyCallChain(success) {
                        switch (self.assignPolicy) {
                            case self.ASSIGN_POLICY.manual:
                                return manualAssignPolicy(success);
                            case self.ASSIGN_POLICY.auto:
                                return autoAssignPolicy(success);
                            default:
                                return manualAssignPolicy(success);
                        }
                    }

                    function manualFinishPolicy(success) {
                        if (success) {
                            return [
                                () => {
                                    self.expand(new Chain(buildDataFocusPolicyCallChain(true)));
                                }
                            ];
                        } else {
                            return [
                                () => {
                                    self.load();
                                }
                            ];
                        }
                    }

                    function autoNoDataFinishPolicy(success) {
                        if (success) {
                            return [
                                () => {
                                    if (self.dataSize <= 0) {
                                        sendFinishTaskRequest(self.createReloadChain());
                                        self.collapse();
                                    } else {
                                        self.expand(new Chain(buildDataFocusPolicyCallChain(true)));
                                    }
                                }
                            ];
                        } else {
                            return [];
                        }
                    }

                    function buildFinishPolicyCallChain(success) {
                        switch (self.finishPolicy) {
                            case self.FINISH_POLICY.manual:
                                return manualFinishPolicy(success);
                            case self.FINISH_POLICY.autoNoData:
                                return autoNoDataFinishPolicy(success);
                            default:
                                return manualFinishPolicy(success);
                        }
                    }

                    function manualDataDocusPolicy(success) {
                        return [];
                    }

                    function autoRequiredDataFocusPolicy(success) {
                        if (success) {
                            return [
                                () => {
                                    self.focusNext();
                                }
                            ];
                        } else {
                            return [];
                        }
                    }

                    function buildDataFocusPolicyCallChain(success) {
                        switch (self.dataFocusPolicy) {
                            case self.DATA_FOCUS_POLICY.manual:
                                return manualDataDocusPolicy(success);
                            case self.DATA_FOCUS_POLICY.autoRequired:
                                return autoRequiredDataFocusPolicy(success);
                            default:
                                return manualDataDocusPolicy(success);
                        }
                    }


                    /*-- Init --*/
                    $scope.disableNestedClick = preventEventDefault;
                    self.update(resource, links);
                    self.tab.addTaskController(self);
                    self.callChain = new Chain(buildAssignPolicyCallChain(true), buildAssignPolicyCallChain(false))
                }]);

    });
