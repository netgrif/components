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

    angular.module('ngMain').controller('DialogController', ['$scope', '$log', '$mdDialog', '$http', '$snackbar', 'parentCtrl', 'optional', '$i18n', '$process', '$timeout','$config',
        function ($scope, $log, $mdDialog, $http, $snackbar, parentCtrl, optional, $i18n, $process, $timeout, $config) {
            var self = this;

            $scope.parentCtrl = parentCtrl;
            $scope.opt = optional;

            // Variables for dialog_assign_user
            $scope.users = undefined;
            self.users = [];
            self.searched = undefined;
            self.selectedUser = undefined;
            self.page = {
                pageLinks: {}
            };
            self.loading = false;
            self.searchLast = undefined;
            self.counter = 0;

            $scope.closeDialog = function () {
                $mdDialog.hide();
            };

            self.autoFocus = function (selector) {
                jQuery(selector).first().focus();
            };

            // Delegate task methods
            self.loadUsers = function (next) {
                if (!$scope.opt.task) return;
                if (self.loading) return;
                if (next && !self.page.pageLinks.next) return;

                self.loading = true;
                let request = self.buildRequest(next ? self.page.pageLinks.next.href : undefined);
                $http(request).then(response => {
                    let lastSelected = self.selectedUser;
                    if (!next)
                        self.clearAll();
                    self.page = Object.assign(self.page, response.page);
                    self.page.pageLinks = response.$response().data._links;
                    response.$request().$get("users").then(resources => {
                        $scope.users = self.users = self.users.concat(resources);
                        if (self.users.some(u => u.id === lastSelected))
                            self.selectedUser = lastSelected;
                        self.loading = false;
                    }, () => {
                        if (self.page.totalElements === 0) {
                            self.clearAll();
                        } else {
                            $log.debug("Resource users was not found");
                        }
                        self.loading = false;
                    });
                }, () => {
                    $snackbar.error($i18n.block.snackbar.failedToLoadUsersInTask);
                });
            };

            self.filterUsers = function () {
                self.counter += 1;
                $timeout(() => {
                    self.counter -= 1;
                    if (self.counter !== 0) {
                        return;
                    }
                    self.searched = self.searched.trim();
                    self.searchLast = self.searched;
                    self.loadUsers(false);
                }, 500);
            };

            self.clearAll = function () {
                self.page = {
                    pageLinks: {}
                };
                $scope.users = self.users = [];
                self.selectedUser = undefined;
            };

            self.buildRequest = function(next) {
                return {
                    method: 'POST',
                    url: next ? next : $config.getApiUrl("/user/search"),
                    params: {
                        small: true,
                        size: 10,
                        sort: "name,asc"
                    },
                    data: self.buildSearchQuery()
                }
            };

            self.buildSearchQuery = function() {
                return {
                    fulltext: !self.searchLast ? "" : self.searchLast,
                    roles: $scope.opt.task.fieldRoles
                }
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

            $scope.getSelectedUserClass = function (id) {
                if (id === self.selectedUser) return 'selected-tile';
            };

            $scope.assignTask = function () {
                if (!$scope.opt.task) return;
                if (self.selectedUser) {
                    $mdDialog.hide(self.users.find(user => user.id === self.selectedUser));
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
