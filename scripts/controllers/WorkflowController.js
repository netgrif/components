define(['angular', '../modules/Workflow', '../modules/Main'],
    function (angular) {
        angular.module('ngWorkflow').controller('WorkflowController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope) {
                    const self = this;

                    self.petriNetMeta = {};
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
                        $fileUpload.upload(self.netFile, meta, "/res/petrinet/import", function (response) {
                            if (response.success) $dialog.closeCurrent();
                            else $snackbar.error($i18n.block.snackbar.modelFailedToUpload);
                            self.netFile = undefined;
                            self.petriNetMeta = {};
                        });
                    };

                    self.loadPetriNets = function () {
                        if (self.petriNetRefs) return;
                        $http.get("/res/petrinet/refs").then(function (response) {
                            $log.debug(response);
                            $log.debug(response.$request());
                            response.$request().$get("petriNetReferences").then(function (resource) {
                                self.petriNetRefs = resource;
                            });
                        }, function () {
                            $log.debug("Petri net refs get failed");
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
                            title: self.searchLast,
                            initials: self.searchLast
                        }
                    };

                    self.buildRequest = function (next) {
                        return {
                            method: 'POST',
                            url: next ? next : "/res/petrinet/search",
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
                            response.$request().$get("petriNetSmalls").then(resources => {
                                resources.forEach((r, i) => {
                                    self.expansionGroup.add(self.expansionPanelName, {
                                        resource: r,
                                        links: response.$response().data._embedded.petriNetSmalls[i]._links
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

                    self.search = function () {
                        self.searchLast = self.searchInput.trim();
                        self.load(false);
                    };


                    self.start();
                }]);
    });