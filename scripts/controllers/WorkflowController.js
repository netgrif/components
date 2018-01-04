define(['angular', '../modules/Workflow', '../modules/Main'],
    function (angular) {
        angular.module('ngWorkflow').controller('WorkflowController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope) {
                    const self = this;

                    self.modelMeta = {};
                    self.modelName = undefined;

                    self.modelChanged = function (file) {
                        if(!file) return;
                        self.modelName = file.name;
                        self.modelFile = file;
                    };

                    self.uploadModel = function () {
                        if(!self.modelFile){
                            $snackbar.error($i18n.block.snackbar.noFileWasAttached);
                            return;
                        }
                        if(self.modelFile.type !== "text/xml"){
                            $snackbar.error($i18n.block.snackbar.fileMustHaveXmlFormat);
                            return;
                        }

                        self.modelMeta.initials = self.modelMeta.initials.toUpperCase();
                        let meta = jQuery.isEmptyObject(self.modelMeta) ? undefined : JSON.stringify(self.modelMeta);
                        $fileUpload.upload(self.modelFile, meta, "/res/petrinet/import", function (response) {
                            if(response.success) $dialog.closeCurrent();
                            else $snackbar.error($i18n.block.snackbar.modelFailedToUpload);
                            self.modelFile = undefined;
                            self.modelMeta = {};
                        });
                    };

                    self.loadModels = function () {
                        if(self.modelRefs) return;
                        $http.get("/res/petrinet/refs").then(function (response) {
                            $log.debug(response);
                            $log.debug(response.$request());
                            response.$request().$get("petriNetReferences").then(function (resource) {
                                self.modelRefs = resource;
                            });
                        }, function () {
                            $log.debug("Petri net refs get failed");
                        });
                    };

                    self.showDialog = function (template) {
                        $dialog.showByTemplate(template, self);
                    };

                }]);
    });