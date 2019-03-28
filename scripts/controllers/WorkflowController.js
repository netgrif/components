define(['angular', '../modules/Workflow', '../modules/Main'],
    function (angular) {
        angular.module('ngWorkflow').controller('WorkflowController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope','$process','$config',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope, $process, $config) {
                    const self = this;

                    self.viewId = $config.show.workflow.viewId;

                    self.petriNetMeta = {
                        releaseType: "patch"
                    };
                    self.netFileName = undefined;

                    self.expansionGroup = undefined;
                    self.expansionPanelName = "workflowPanel";
                    self.panels = [];
                    self.page = {
                        pageLinks: {}
                    };
                    self.searchInput = undefined;
                    self.searchLast = undefined;
                    self.loading = false;
                    self.uploadProgress = 0;
                    self.startupLock = true;


                    self.netFileChanged = function (file) {
                        if (!file) return;
                        self.netFileName = file.name;
                        self.netFile = file;
                    };

                    self.uploadPetriNet = function () {
                        if (!self.netFile) {
                            $snackbar.error($i18n.block.snackbar.noFileWasAttached);
                            return;
                        }
                        if (self.netFile.type !== "text/xml") {
                            $snackbar.error($i18n.block.snackbar.fileMustHaveXmlFormat);
                            return;
                        }

                        self.petriNetMeta.initials = self.petriNetMeta.initials.toUpperCase();
                        let meta = jQuery.isEmptyObject(self.petriNetMeta) ? undefined : JSON.stringify(self.petriNetMeta);
                        $fileUpload.upload(self.netFile, meta, "/petrinet/import", uploadEvent => {
                            if (uploadEvent.lengthComputable) {
                                self.uploadProgress = (uploadEvent.loaded / uploadEvent.total) * 100;
                            }
                        }, function (response) {
                            self.uploadProgress = 0;
                            if (response.success) {
                                $dialog.closeCurrent();
                                self.clearAll();
                                self.load(false);
                                $process.loadNets(true);
                            }
                            else $snackbar.error($i18n.block.snackbar.modelFailedToUpload);
                            self.netFile = undefined;
                            self.petriNetMeta = {};
                        });
                    };

                    self.showDialog = function (template) {
                        $dialog.showByTemplate(template, self);
                    };

                    self.start = function () {
                        $timeout(() => {
                            self.expansionGroup = $mdExpansionPanelGroup('workflowExpansionGroup');
                            try {
                                self.expansionGroup.register(self.expansionPanelName, {
                                    templateUrl: 'views/app/panels/workflow_panel.html',
                                    controller: 'WorkflowPanelController',
                                    controllerAs: 'workPanelCtrl'
                                });
                            } catch (error) {
                                //panel already registered in the group
                                $log.debug(error);
                            }
                            self.startupLock = false;
                            self.load(false);
                        }, 200);
                    };

                    self.clearAll = function () {
                        self.page = {
                            pageLinks: {}
                        };
                        self.expansionGroup.removeAll();
                        self.panels.splice(0, self.panels.length);
                    };

                    self.buildSearchQuery = function () {
                        if (!self.searchLast)
                            return {};
                        return {
                            or: {
                                identifier: self.searchLast,
                                title: self.searchLast,
                                initials: self.searchLast
                            }
                        }
                    };

                    self.buildRequest = function (next) {
                        return {
                            method: 'POST',
                            url: next ? next : $config.getApiUrl("/petrinet/search"),
                            data: self.buildSearchQuery()
                        };
                    };

                    self.load = function (next) {
                        if (self.loading || self.startupLock) return;
                        if (next && self.panels && self.page.totalElements === self.panels.length) return;
                        if (next && !self.page.pageLinks.next) return;

                        self.loading = true;
                        $http(self.buildRequest(next ? self.page.pageLinks.next : undefined)).then(response => {
                            if (response.page.totalElements === 0) {
                                $snackbar.info($i18n.block.snackbar.noWorkflowModel);
                                self.clearAll();
                                self.loading = false;
                                return;
                            }
                            if (!next)
                                self.clearAll();
                            self.page = Object.assign(self.page, response.page);
                            self.page.pageLinks = response.$response().data._links;
                            response.$request().$get("petriNetReferences").then(resources => {
                                resources.forEach((r, i) => {
                                    self.expansionGroup.add(self.expansionPanelName, {
                                        resource: r,
                                        links: response.$response().data._embedded.petriNetReferences[i]._links,
                                        parent: self
                                    }).then(panel => {
                                        self.panels.push(panel);
                                    })
                                });
                                self.loading = false;
                            });

                        }, error => {
                            $snackbar.error($i18n.block.snackbar.loadingWorkflowFailed);
                            self.loading = false;
                        });
                    };

                    const navClickListener = $rootScope.$on("navClick", (event, data) => {
                        if (data.item === self.viewId) {
                            self.load(false);
                        }
                    });

                    self.search = function () {
                        self.searchLast = self.searchInput.trim();
                        self.load(false);
                    };

                    self.start();
                    $scope.$on('$destroy', navClickListener);
                }]);
    });