
define(['angular', 'angularMaterial', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$snackbar', function ($mdToast, $log) {
        var delay = 2500;
        var position = "bottom right";

		var infoTemplate = "<md-toast><div class='md-toast-content'><span class='md-toast-text' flex>{{msg}}</span></div></md-toast>";
		var warningTemplate = "<md-toast><div class='md-toast-content'><md-icon class='material-icons color-fg-warning'>priority_high</md-icon><span class='md-toast-text' flex>{{msg}}</span></div></md-toast>";
        var errorTemplate = "<md-toast><div class='md-toast-content'><span class='md-toast-text' flex>{{msg}}</span><md-icon class='material-icons cursor-pointer color-fg-error' ng-click='close()'>close</md-icon></div></md-toast>";
		var successTemplate = "<md-toast><div class='md-toast-content'><md-icon class='material-icons color-fg-success'>done</md-icon><span class='md-toast-text' flex>{{msg}}</span></div></md-toast>";

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
            simple: function (msg) {
                msg && $mdToast.show($mdToast.simple()
                    .textContent(msg)
                    .position(position)
                    .hideDelay(delay));
            },
            info: function (msg) {
                if (msg) {
                    buildSnackbar(msg, infoTemplate, delay);
                }
            },
            warning: function (msg) {
                if (msg) {
                    buildSnackbar(msg, warningTemplate, delay);
                }
            },
            error: function (msg) {
                if (msg) {
                    $log.debug(msg);
                    buildSnackbar(msg, errorTemplate, 0);
                }
            },
			success: function (msg) {
				if (msg) {
					buildSnackbar(msg, successTemplate, delay);
				}
			},
            hide: function () {
                $mdToast.hide();
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
