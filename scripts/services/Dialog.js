define(['angular', 'angularMaterial', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$dialog', function ($mdDialog, $log, $i18n) {
        const callbacks = {};

        const dialogService = {
            cache: {},

            showByTemplate: function (template, parentController, optional) {
                return $mdDialog.show({
                    controller: 'DialogController',
                    controllerAs: 'dialogCtrl',
                    templateUrl: '../../views/app/dialogs/dialog_' + template + '.html',
                    parent: angular.element(document.body),
                    locals: {
                        parentCtrl: parentController,
                        optional: optional
                    },
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    fullscreen: true
                });
            },
            show: function (template, parent, controller, locals, openFrom = undefined) {
                return $mdDialog.show({
                    controller: controller,
                    controllerAs: 'dialogCtrl',
                    templateUrl: '../../views/app/dialogs/dialog_' + template + ".html",
                    parent: angular.element(document.body),
                    openFrom: openFrom,
                    locals: {
                        parent: parent,
                        locals: locals
                    },
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    fullscreen: true
                });
            },
            showByElement: function (elementId, parent, locals, callback) {
                dialogService.cache = locals;
                if (callback && callbacks[callback])
                    callbacks[callback]();

                return $mdDialog.show({
                    contentElement: '#' + elementId,
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    fullscreen: true
                });
            },
            closeCurrent: function () {
                $mdDialog.hide();
            },
            addCallback: function (name, callback) {
                callbacks[name] = callback;
                $log.debug(`Added callback ${name}`);
            }
        };
        return dialogService;
    });

    angular.module('ngMain').controller('DialogController', ['$scope', '$log', '$mdDialog', '$http', '$snackbar', 'parentCtrl', 'optional', '$i18n', '$process', '$timeout',
        function ($scope, $log, $mdDialog, $http, $snackbar, parentCtrl, optional, $i18n, $process, $timeout) {
            var self = this;

            $scope.parentCtrl = parentCtrl;
            $scope.opt = optional;

            // Variables for dialog_assign_user
            $scope.users = undefined;
            self.users = undefined;
            self.searched = undefined;
            self.selectedUser = undefined;

            $scope.closeDialog = function () {
                $mdDialog.hide();
            };

            self.autoFocus = function (selector) {
                jQuery(selector).first().focus();
            };

            // Delegate task methods
            self.loadUsers = function () {
                if (!$scope.opt.task) return;
                $http.post("/api/user/role/small", $scope.opt.task.fieldRoles).then(function (response) {
                    self.users = response.$request().$get("users").then(function (resources) {
                        $scope.users = self.users = resources;
                    }, function () {
                        $log.debug("Resource users was not found");
                    });
                }, function () {
                    $snackbar.error($i18n.block.snackbar.failedToLoadUsersInTask + " " + task.visualId);
                });
            };

            $scope.filterUsers = function () {
                if (!self.users) return;
                if (self.users.length === 0) return;
                if (!self.searched || self.searched === '') {
                    //$scope.users = self.users.concat($scope.users.filter(user => self.users.indexOf(user) < 0)); //union of two arrays
                    $scope.users = self.users;
                } else {
                    $scope.users = self.users.filter(user => user.fullName.includes(self.searched) || user.email.includes(self.searched));
                }
            };

            $scope.getSelectedUserClass = function (email) {
                if (email === self.selectedUser) return 'selected-tile';
            };

            $scope.assignTask = function () {
                if (!$scope.opt.task) return;
                if (!self.selectedUser) {
                    $mdDialog.hide();
                } else {
                    $mdDialog.hide(self.users.find(user => user.email === self.selectedUser));
                }
            };

            self.loadRoles = function () {
                $scope.opt.roles = [];
                $scope.opt.filter.forEach(net => {
                    $scope.opt.roles = $scope.opt.roles.concat($process.get(net).roles);
                });
            };

            if ($scope.opt && $scope.opt.task) {
                self.loadUsers();
            }
            if ($scope.opt && $scope.opt.filter) {
                self.loadRoles();
            }

            if (parentCtrl.petriNetRefs && parentCtrl.petriNetRefs.length === 1) {
                parentCtrl.newCase.netId = parentCtrl.petriNetRefs[0].entityId;
            }

            if ($scope.opt && $scope.opt.onOpenAutoFocus)
                $timeout(function() {
                    self.autoFocus('.on-open-auto-focus input');
                }, 500);

        }]);
});
