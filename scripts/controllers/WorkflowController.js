/**
 * Created by Milan on 11.2.2017.
 */
define(['angular', '../modules/Workflow', '../services/FileUpload'], function (angular) {
	angular.module('ngWorkflow').controller('WorkflowController', ['$log', '$scope', '$rootScope', '$fileUpload', '$http', '$dialog',
        function ($log, $scope, $rootScope, $fileUpload, $http, $dialog) {
			var self = this;

			self.petriNetMeta = {};
			self.newCase = {};


			self.uploadPetriNet = function () {
				var file = $rootScope.mFile;
				//console.dir(file);
				var meta = jQuery.isEmptyObject(self.petriNetMeta) ? undefined : JSON.stringify(self.petriNetMeta);
				$fileUpload.upload(file, meta, "/res/petrinet/import", function (response) {

				});
			};

			self.createCase = function () {
				if (!jQuery.isEmptyObject(self.newCase) || !self.newCase.netId) {
					$http.post("/res/workflow/case", JSON.stringify(self.newCase))
						.then(function (response) {
							$log.debug(response);
						}, function () {
							$log.debug("Creating new case failed!");
						});
				}
			};

			self.loadPetriNets = function () {
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
				$dialog.showByTemplate(template);
			};
    }]);
});
