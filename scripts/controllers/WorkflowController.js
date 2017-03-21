
define(['angular', '../modules/Workflow', '../services/FileUpload'], function (angular) {
	angular.module('ngWorkflow').controller('WorkflowController', ['$log', '$scope', '$rootScope', '$fileUpload', '$http', '$dialog', '$snackbar',
        function ($log, $scope, $rootScope, $fileUpload, $http, $dialog, $snackbar) {
			var self = this;

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
					$snackbar.error("No file was attached!");
					return;
				}
				if(self.netFile.type != "text/xml"){
					$snackbar.error("File must have XML format!");
					return;
				}

				//console.dir(self.netFile);
				self.petriNetMeta.initials = self.petriNetMeta.initials.toUpperCase();
				let meta = jQuery.isEmptyObject(self.petriNetMeta) ? undefined : JSON.stringify(self.petriNetMeta);
				$fileUpload.upload(self.netFile, meta, "/res/petrinet/import", function (response) {
					if(response.success) $dialog.closeCurrent();
					else $snackbar.error("Uploading Petri Net failed!");
					self.netFile = undefined;
					self.petriNetMeta = {};
				});
			};

			self.createCase = function () {
				if (!jQuery.isEmptyObject(self.newCase) || !self.newCase.netId) {
					$http.post("/res/workflow/case", JSON.stringify(self.newCase))
						.then(function (response) {
							$log.debug(response);
							if(response.success)$dialog.closeCurrent();
							self.newCase = {};
						}, function () {
							$log.debug("Creating new case failed!");
							self.newCase = {};
						});
				}
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
