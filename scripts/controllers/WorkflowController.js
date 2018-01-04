define(['angular', '../modules/Workflow', '../modules/Main'],
    function (angular) {
        angular.module('ngWorkflow').controller('WorkflowController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope) {
                    const self = this;

                    self.petriNetMeta = {};
                    self.newCase = {};
                    self.netFileName = undefined;

                    self.netFileChanged = function (file) {
                        if(!file) return;
                        self.netFileName = file.name;
                        self.netFile = file;
                    };

                    self.uploadPetriNet = function () {
                        if(!self.netFile){
                            $snackbar.error($i18n.block.snackbar.noFileWasAttached);
                            return;
                        }
                        if(self.netFile.type !== "text/xml"){
                            $snackbar.error($i18n.block.snackbar.fileMustHaveXmlFormat);
                            return;
                        }

                        self.petriNetMeta.initials = self.petriNetMeta.initials.toUpperCase();
                        let meta = jQuery.isEmptyObject(self.petriNetMeta) ? undefined : JSON.stringify(self.petriNetMeta);
                        $fileUpload.upload(self.netFile, meta, "/res/petrinet/import", function (response) {
                            if(response.success) $dialog.closeCurrent();
                            else $snackbar.error($i18n.block.snackbar.modelFailedToUpload);
                            self.netFile = undefined;
                            self.petriNetMeta = {};
                        });
                    };

                    self.loadPetriNets = function () {
                        if(self.petriNetRefs) return;
                        $http.get("/res/petrinet/refs").then(function (response) {
                            $log.debug(response);
                            $log.debug(response.$request());
                            response.$request().$get("petriNetReferences").then(function (resource) {
                                self.petriNetRefs = resource;
                            });
                        }, function () {
                            $log.debug("Petri net refs get failed!");
                        });
                    };

                    self.showDialog = function (template) {
                        $dialog.showByTemplate(template, self);
                    };

                }]);
    });