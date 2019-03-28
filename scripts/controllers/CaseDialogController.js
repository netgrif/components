define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../classes/Case', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab, Case) {
        angular.module('ngMain').controller('CaseDialogController',
            ['$log', '$scope', '$http', '$mdDialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', 'locals', '$i18n','$config',
                function ($log, $scope, $http, $mdDialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, locals, $i18n, $config) {
                    const self = this;

                    Object.assign(this, locals, locals.locals);
                    self.cases = [];
                    self.selectedCase = undefined;

                    //TODO: 23.7.2017 ošetriť pagination
                    self.loadCases = function (netId) {
                        if (!netId) return;
                        const self = this;
                        $http.post($config.getApiUrl("/workflow/case/search"), {petriNet: {id: netId}}).then(function (response) {
                            response.$request().$get("cases").then(function (resources) {
                                self.cases = resources;
                                self.cases.forEach(c => {
                                    if (this.immediateData) {
                                        this.immediateData.forEach(data => {
                                            if (data.type === 'date') data.value = Case.formatDate(data.value);
                                        });
                                    }

                                    c.select = function () {
                                        if (self.selectedCase === this && this.selected) {
                                            this.selected = false;
                                            self.selectedCase = undefined;
                                        } else {
                                            const i = self.cases.findIndex(item => item.selected);
                                            if (i !== -1) self.cases[i].selected = false;
                                            this.selected = true;
                                            self.selectedCase = this;
                                        }
                                    };
                                });

                            }, function () {
                                $log.debug("No resource for cases was found!");
                            });
                        }, function () {
                            $snackbar.error($i18n.block.snackbar.noCasesToChooseFrom);
                        });
                    };

                    $scope.choose = function () {
                        if (self.selectedCase) $mdDialog.hide(self.selectedCase);
                        else $mdDialog.hide(undefined);
                    };

                    $scope.hide = function () {
                        $mdDialog.hide();
                    };

                    if (self.net)
                        self.loadCases(self.net.entityId);
                }]);
    });
