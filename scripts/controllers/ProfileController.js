define(['angular', '../modules/Main'],
    function (angular) {
        angular.module('ngMain').controller('ProfileController',
            ['$http', '$log', '$scope', '$snackbar', '$auth', '$user', '$process', '$i18n', '$rootScope', '$dialog',
                function ($http, $log, $scope, $snackbar, $auth, $user, $process, $i18n, $rootScope, $dialog) {
                    const self = this;

                    const TOTAL_INPUTS = 4;

                    const profileUrl = "/api/user/me?small=true";
                    const groupsUrl = "/api/group/my";

                    self.isInEditMode = false;

                    self.stored = {};
                    self.user = {};
                    self.userProcessRoles = [];
                    self.userGroupResources = [];
                    self.completion = 0;

                    self.loadProfile = function () {
                        $http.get(profileUrl).then(function (response) {
                            self.user = response;
                            self.updateCompletion();
                            $log.debug(self.user);
                            console.log(self.user);   // todo delete
                        }, function () {
                            $snackbar.error($i18n.block.snackbar.unableToLoadUserData);
                        });
                    };

                    self.updateCompletion = function () {
                        self.completion = parseResponse(self.user) / TOTAL_INPUTS * 100;
                    };

                    function capitalizeFirstLetter(string) {
                        const str = string.toLowerCase();

                        return str.charAt(0).toUpperCase() + str.slice(1);
                    }

                    self.getRoleName = function (authority) {
                        const name = authority.substring(authority.indexOf('_') + 1);

                        return capitalizeFirstLetter(name);
                    };

                    let parseResponse = user => {
                        let inputs = 0;

                        if (!user) return;

                        if (user.name)
                            inputs++;
                        if (user.surname)
                            inputs++;
                        if (user.email)
                            inputs++;
                        if (user.telNumber)
                            inputs++;

                        return inputs;
                    };

                    self.openChangePswDialog = function () {
                        $dialog.showByTemplate('change_psw', this);
                    };

                    self.changePsw = function () {
                        if (!self.currentPsw || !self.newPsw || !self.repeatNewPsw)
                            return;

                        if (self.newPsw === self.repeatNewPsw) {
                            let data = {
                                currentPsw: self.currentPsw,
                                newPsw: self.newPsw,
                                repeatNewPsw: self.repeatNewPsw
                            };
                            $auth.changePassword(data, function (isSuccessful, message) {
                                if (isSuccessful) {
                                    $snackbar.success($i18n.block.snackbar.changePasswordSuccessful);
                                    $dialog.closeCurrent();
                                    self.currentPsw = "";
                                    self.newPsw = "";
                                    self.repeatNewPsw = "";
                                } else {
                                    resolveChangePasswordResponseMessage(message);
                                }
                            });
                        } else {
                            $snackbar.error($i18n.block.snackbar.passwordFieldsDoNotMatch)
                        }
                    };

                    let resolveChangePasswordResponseMessage = responseMessage => {
                        switch (responseMessage) {
                            case "Incorrect login!":
                                $snackbar.error($i18n.block.snackbar.incorrectLogin);
                                break;
                            case "Insufficient password!":
                                $snackbar.error($i18n.block.snackbar.insufficientPassword);
                                break;
                            case "Incorrect password!":
                                $snackbar.error($i18n.block.snackbar.incorrectPassword);
                                break;
                            default:
                                $snackbar.error($i18n.block.snackbar.changePasswordFailed);
                        }
                    };

                    self.loadProcessRolesOfUser = function () {
                        self.userProcessRoles = [];
                        $process.nets.forEach(function (net) {
                            let roles = net.roles.filter(role => $user.roles.includes(role.id));
                            self.userProcessRoles.push({
                                name: net.title,
                                identifier: net.identifier,
                                version: net.version,
                                roles: roles
                            });
                        });
                        console.log(self.userProcessRoles);   // todo delete
                    };

                    self.loadGroupsOfUser = function () {
                        $http.get(groupsUrl)
                            .then(response => {
                                self.userGroupResources = response.$response().data;
                                console.log(self.userGroupResources);  // todo delete
                            }, error => {
                                $log.error(error);
                                $snackbar.error($i18n.block.snackbar.unableToLoadUserGroups);
                            });
                    };

                    self.updateUser = function () {
                        let updates = {
                            avatar: self.user.avatar,
                            telNumber: self.user.telNumber,
                            name: self.user.name,
                            surname: self.user.surname,
                        };
                        $auth.updateUser(updates, function (isSuccessful, response) {
                            if (isSuccessful) {
                                $snackbar.success($i18n.block.snackbar.profileUpdated);
                            } else {
                                $snackbar.success($i18n.block.snackbar.profileFailedToUpdate);
                            }
                        });
                    };

                    self.enableEdit = function () {
                        self.storeProfileData();
                        self.isInEditMode = true;
                    };

                    self.cancelEdit = function () {
                        self.revertChangesOnCancel();
                        self.isInEditMode = false;
                    };

                    self.revertChangesOnCancel = function () {
                        self.user.name = self.stored.user.name;
                        self.user.surname = self.stored.user.surname;
                        self.user.telNumber = self.stored.user.telNumber;
                        self.user.avatar = self.stored.user.avatar;
                    };

                    self.storeProfileData = function () {
                        self.stored.user = {};
                        self.stored.user.name = self.user.name;
                        self.stored.user.surname = self.user.surname;
                        self.stored.user.telNumber = self.user.telNumber;
                        self.stored.user.avatar = self.user.avatar;
                    };

                    self.loadProfile();
                    self.loadProcessRolesOfUser();
                    self.loadGroupsOfUser();
                }]);
    });