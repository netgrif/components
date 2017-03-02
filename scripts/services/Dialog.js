define(['angular','angularMaterial','../modules/Main'],function (angular) {
	angular.module('ngMain').factory('$dialog', function ($mdDialog, $log) {
		return {
			showByTemplate: function (template, parentController) {
				$mdDialog.show({
					controller: function ($scope, $mdDialog) {
						$scope.parentCtrl = parentController;
						$scope.closeDialog = function () {
							$mdDialog.hide();
						};
					},
					templateUrl: '../../views/app/dialogs/dialog_' + template + '.html',
					parent: angular.element(document.body),
					clickOutsideToClose: true,
					escapeToClose: true,
					fullscreen: true
				}).then(function () {
				 	$log.debug("Dialog promise accepted");
				}, function () {
				 	$log.debug("Dialog promise rejected");
				});
			},
			closeCurrent: function () {
				$mdDialog.hide();
            }
		};
	});
});
