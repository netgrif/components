/**
 * Created by Milan on 11.2.2017.
 */
define(['angular', '../modules/Workflow', '../services/FileUpload'], function (angular) {
	angular.module('ngWorkflow').controller('WorkflowController', ['$log', '$scope', '$rootScope', '$fileUpload', '$http', '$mdDialog',
        function ($log, $scope, $rootScope, $fileUpload, $http, $mdDialog) {
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
				$log.debug("Dialog opened -> template: " + template);
				$mdDialog.show({
					controller: DialogController,
					templateUrl: '../../views/app/dialogs/dialog_' + template + '.html',
					parent: angular.element(document.body),
					clickOutsideToClose: true,
					escapeToClose: true,
					fullscreen: true
				})
				.then(function () {
					$log.debug("Dialog closed success");
				}, function() {
					$log.debug("Escape to close/click outside to close or dialog error occured");
				})
				.finally(function () {
					//TODO clean up
				});
			};

			function DialogController($scope, $mdDialog) {
				$scope.closeDialog = function() {
					$mdDialog.hide();
				}
			}
    }]);
});
