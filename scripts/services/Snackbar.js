
define(['angular', 'angularMaterial', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$snackbar', function ($mdToast, $log) {
        var delay = 3000;
        var position = "bottom right";

        var errorTemplate = "<md-toast><div class='md-toast-content color-bg-error'><span class='md-toast-text' flex>{{msg}}</span><md-button class='md-action' ng-click='close()'>Close</md-button></div></md-toast>";
        var infoTemplate = "<md-toast><div class='md-toast-content'><span class='md-toast-text' flex>{{msg}}</span></div></md-toast>";
		var successTemplate = "<md-toast><div class='md-toast-content' color-bg-success><span class='md-toast-text' flex>{{msg}}</span></div></md-toast>";

        function buildSnackbar(msg, template, delay) {
            $mdToast.show({
                template: template,
                hideDelay: delay,
                position: position,
                controller: 'SnackbarController',
                locals: {msg: msg}
            });
        }

        return {
            show: function (msg) { //Legacy method //TODO: 6/3/2017 remove when no use
                msg && $mdToast.show($mdToast.simple()
                    .textContent(msg)
                    .position(position)
                    .hideDelay(delay));
            },
            simple: function (msg) {
                msg && $mdToast.show($mdToast.simple()
                    .textContent(msg)
                    .position(position)
                    .hideDelay(delay));
            },
            error: function (msg) {
                if (msg) {
                    $log.debug(msg);
                    buildSnackbar(msg, errorTemplate, 0);
                }
            },
            info: function (msg) {
                if (msg) {
                    buildSnackbar(msg, infoTemplate, delay);
                }
            },
			success: function (msg) {
				if (msg) {
					buildSnackbar(msg, successTemplate, delay);
				}
			}
        };
    });

    angular.module('ngMain').controller('SnackbarController', ['$scope', '$mdToast', '$log', 'msg',
        function ($scope, $mdToast, $log, msg) {
            $scope.msg = msg;

            $scope.close = function () {
                $mdToast.hide();
            };
    }]);
});
