
define(['angular', '../modules/Workflow', '../services/FileUpload'], function (angular) {
	angular.module('ngWorkflow').controller('WorkflowController', ['$log', '$scope', '$rootScope', '$fileUpload', '$http', '$dialog', '$snackbar',
        function ($log, $scope, $rootScope, $fileUpload, $http, $dialog, $snackbar) {
			var self = this;

			self.petriNetMeta = {};
			self.newCase = {};


			self.uploadPetriNet = function () {
				if(!$rootScope.mFile){
					$snackbar.show("No file was attached!");
					return;
				}
				if($rootScope.mFile.type != "text/xml"){
					$snackbar.show("File must have XML format!");
					return;
				}
				var file = $rootScope.mFile;
				//console.dir(file);
				self.petriNetMeta.initials = self.petriNetMeta.initials.toUpperCase();
				var meta = jQuery.isEmptyObject(self.petriNetMeta) ? undefined : JSON.stringify(self.petriNetMeta);
				$fileUpload.upload(file, meta, "/res/petrinet/import", function (response) {
					if(response.success) $dialog.closeCurrent();
					else $snackbar.show("Uploading Petri Net failed!");
					$rootScope.mFile = undefined;
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
