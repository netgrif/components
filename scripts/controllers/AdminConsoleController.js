define(['angular', '../modules/Admin'], function (angular) {
    angular.module('ngAdmin').controller('AdminConsoleController', ['$log', '$scope', '$http', '$snackbar', '$timeout', '$user', '$i18n', '$location', '$auth',
        function ($log, $scope, $http, $snackbar, $timeout, $user, $i18n, $location, $auth) {
            if (!$user.hasAuthority("ROLE_ADMIN"))
                $location.path("/");

            const self = this;

            //Invitation
            self.inviteLoading = false;
            self.invitedUser = {
                email: undefined,
                organizations: [],
                processRoles: {}
            };
            self.organizations = [];
            self.processRoles = [];
            self.selectedNet = undefined;

            //Data for users and roles tab
            self.users = [];
            self.processes = [];

            //Users tab
            self.userTab = {
                searchedUsers: [],
                searchedRoles: [],
                selectedUser: undefined,
                roles: {
                    process: undefined,
                    roles: []
                },
                userSearch: {
                    input: "",
                    byEmail: true,
                    byName: true
                },
                roleSearch: "",
            };

            //Roles tab
            self.rolesTab = {
                searchedUsers: [],
                searchedRoles: [],
                selectedRole: undefined,
                roles: {
                    process: undefined,
                    roles: []
                },
                userSearch: {
                    input: "",
                    byEmail: true,
                    byName: true
                },
                roleSearch: ""
            };

            self.changeUserSignUpPolicy = $auth.userSignUp;

            /**
             * Load process roles for invite tab.
             * Before calling this method, this controller must have loaded list of petri nets.
             * To load list of petri nets use method self.loadNets
             */
            self.loadProcessRoles = function () {
                if (!self.selectedNet) return;
                self.processRoles = [];
                $http.get("/res/petrinet/" + self.selectedNet.entityId + "/roles").then(function (response) {
                    response.$request().$get("processRoles").then(function (resources) {
                        self.processRoles = resources;
                        self.processRoles.forEach(role => {
                            role.add = function () {
                                if (self.invitedUser.processRoles[self.selectedNet.entityId]) {
                                    if (!self.invitedUser.processRoles[self.selectedNet.entityId].roles.includes(this))
                                        self.invitedUser.processRoles[self.selectedNet.entityId].roles.push(this);
                                } else {
                                    self.invitedUser.processRoles[self.selectedNet.entityId] = {roles: []};
                                    Object.assign(self.invitedUser.processRoles[self.selectedNet.entityId], self.selectedNet);
                                    self.invitedUser.processRoles[self.selectedNet.entityId].roles.push(this);
                                }
                            };
                            role.remove = function (net) {
                                const i = self.invitedUser.processRoles[net].roles.indexOf(this);
                                if (i !== -1) {
                                    self.invitedUser.processRoles[net].roles.splice(i, 1);
                                    if (self.invitedUser.processRoles[net].roles.length === 0)
                                        delete self.invitedUser.processRoles[net];
                                }
                            };
                        });
                    }, function () {
                        $log.debug("No roles found in resource!");
                    });
                }, function () {
                    $snackbar.error($i18n.block.snackbar.failedToLoadRolesForProcess + " " + self.selectedNet.title);
                });
            };

            /**
             * Load list of organizations for invite tab
             */
            self.loadOrganizations = function () {
                $http.get("/res/user/organizations").then(function (response) {
                    response.$request().$get("organizations").then(function (resources) {
                        self.organizations = resources;
                        self.organizations.forEach(org => {
                            org.add = function () {
                                if (!self.invitedUser.organizations.includes(this))
                                    self.invitedUser.organizations.push(this);
                            };
                            org.remove = function () {
                                const i = self.invitedUser.organizations.indexOf(this);
                                if (i !== -1)
                                    self.invitedUser.organizations.splice(i, 1);
                            };
                        });
                    }, function () {
                        $log.debug("No resource for organizations was found!");
                    });
                }, function () {
                    $snackbar.error($i18n.block.snackbar.noOrganizationFound);
                });
            };

            /**
             * Send invitation request
             */
            self.invite = function () {
                if (!self.invitedUser.email || self.invitedUser.email === "") {
                    $snackbar.error($i18n.block.snackbar.emailFieldIsMandatory);
                    return;
                }
                if (self.invitedUser.organizations.length === 0) {
                    $snackbar.error($i18n.block.snackbar.newUserMustBelongToOneOrMoreOrganization);
                    return;
                }
                if (jQuery.isEmptyObject(self.invitedUser.processRoles)) {
                    $snackbar.error($i18n.block.snackbar.newUserMustHasAssignedOneOrMoreRoles);
                    return;
                }

                const invitation = {
                    email: self.invitedUser.email,
                    organizations: self.invitedUser.organizations.map(org => org.entityId),
                    processRoles: jQuery.map(self.invitedUser.processRoles, (val, i) => val.roles.map(role => role.stringId))
                };

                self.inviteLoading = true;
                $http.post('/signup/invite', invitation)
                    .then(function (response) {
                        $snackbar.success($i18n.block.snackbar.inviteSent);
                        self.invitedUser.email = undefined;
                        self.invitedUser.organizations.splice(0, self.invitedUser.organizations.length);
                        self.invitedUser.processRoles = {};
                        self.inviteLoading = false;
                    }, function () {
                        $snackbar.error($i18n.block.snackbar.inviteFailed);
                        self.inviteLoading = false;
                    });
            };

            /* Roles and Users tab */
            /**
             * Load list of process roles of selected process
             * @param process Selected process by user
             * @param rolesStorage Destination array
             * @param filteredRolesStorage Array which contains results of role search input
             */
            self.loadRoles = function (process, rolesStorage, filteredRolesStorage) {
                if (process) return;
                rolesStorage.splice(0, rolesStorage.length);
                filteredRolesStorage.splice(0, filteredRolesStorage.length);
                $http.get("/res/petrinet/" + process.entityId + "/roles").then(response => {
                    response.$request().$get("processRoles").then(resources => {
                        rolesStorage = resources;
                        rolesStorage.forEach(role => role.selected = false);
                        filteredRolesStorage = rolesStorage;

                    }, () => {
                        $log.debug("No roles was found!");
                    });
                }, () => {
                    $snackbar.error($i18n.block.snackbar.failedToLoadRolesForProcess + " " + self.roles.title);
                });
            };

            /**
             * Load list of all active users in the system
             * @param usersStorage Destination array
             * @param filteredUsersStorage Array which contains results of user search input
             */
            self.loadUsers = function (usersStorage, filteredUsersStorage) {
                if (usersStorage.length > 0) {
                    filteredUsersStorage = usersStorage;
                    return;
                }
                $http.get("/res/user/small").then(response => {
                    response.$request().$get("users").then(resources => {
                        usersStorage = resources;
                        usersStorage.forEach(user => {
                            user.roles = new Set(user.userProcessRoles.map(role => role.roleId));
                            user.selected = false;
                        });
                        filteredUsersStorage = usersStorage;
                    }, () => {
                        $log.debug("No user resource was found!");
                    });
                }, () => {
                    $snackbar.error($i18n.block.snackbar.failedToLoadUsers);
                });
            };

            /**
             * Search among loaded users
             * @param usersStorage Array of all loaded users
             * @param filteredUsersStorage Destination array of search results
             * @param userSearch Search object with input and search params
             * @returns {Array}
             */
            self.filterUsers = function (usersStorage, filteredUsersStorage, userSearch) {
                if (!usersStorage || usersStorage.length === 0)
                    return null;
                userSearch.input = userSearch.input.trim();
                if (!userSearch.input || userSearch.input === "")
                    filteredUsersStorage = usersStorage;
                else {
                    filteredUsersStorage = usersStorage.filter(user => {
                        let include = false;
                        if (userSearch.byName)
                            include = include || user.fullName.includes(userSearch.input);
                        if (userSearch.byEmail)
                            include = include || user.email.includes(userSearch.input);
                        return include;
                    });
                }
                return filteredUsersStorage;
            };

            /**
             * Search among loaded process roles
             * @param rolesStorage Array of loaded roles for selected process
             * @param filteredRolesStorage Destination array of search results
             * @param roleSearch Search input from user
             * @returns {Array}
             */
            self.filterRoles = function (rolesStorage, filteredRolesStorage, roleSearch) {
                if (!rolesStorage || rolesStorage === 0)
                    return null;
                roleSearch = roleSearch.trim();
                if (!roleSearch || roleSearch === "")
                    filteredRolesStorage = rolesStorage;
                else
                    filteredRolesStorage = rolesStorage.filter(role => role.name.includes(roleSearch));
                return filteredRolesStorage;
            };

            /**
             * Toggle selected state on user and highlight all roles from search results that user has
             * @param user clicked user
             * @param rolesStorage
             * @param tabObject Object responsible for handling tab related variables
             */
            self.selectUser = function (user, rolesStorage, tabObject) {
                let selectedEmail = "";
                if (tabObject.selectedUser) {
                    selectedEmail = tabObject.selectedUser.email;
                    tabObject.selectedUser.selected = false;
                    tabObject.selectedUser = undefined;
                    rolesStorage.forEach(role => role.selected = false);
                }
                if (user && user.email !== selectedEmail) {
                    user.selected = true;
                    tabObject.selectedUser = user;
                    rolesStorage.forEach(role => role.selected = user.roles.has(role.stringId));
                }


                // let helpUser;
                // let intersect = new Set(user.selected ? user.roles :
                //     ((helpUser = self.users.find(us => us.selected)) ? helpUser.roles : []));
                // self.users.forEach(u =>
                //     intersect = u.selected ? new Set([...intersect].filter(i => u.roles.has(i))) : intersect);
                // self.roles.roles.forEach(role => role.selected = intersect.has(role.stringId));
            };

            /**
             * Add or remove clicked role to selected user.
             * Role is removed when is already assigned to user otherwise is new roles add to the role set
             * @param user Selected user
             * @param role Clicked role
             * @param after Function that runs after successful operation
             */
            self.changeRoleToUser = function (user, role, after = angular.noop) {
                if(user.roles.has(role.stringId))
                    user.roles.delete(role.stringId);
                else
                    user.roles.add(role.stringId);

                after(user);
            };

            /**
             * Toggle selected state on role and highlight all users that has selected role
             * @param role clicked role
             * @param usersStorage
             * @param tabObject Object responsible for handling tab related variables
             */
            self.selectRole = function (role, usersStorage, tabObject) {
                let roleId = "";
                if (tabObject.selectedRole) {
                    roleId = tabObject.selectedRole.stringId;
                    tabObject.selectedRole.selected = false;
                    usersStorage.forEach(user => user.selected = false);
                }
                if (role && role.stringId !== roleId) {
                    role.selected = true;
                    tabObject.selectedRole = role;
                    usersStorage.forEach(user => user.selected = user.roles.has(role.stringId));
                }

                // let rolesChanged = false;
                // self.users.forEach(user => {
                //     if (user.selected) {
                //         if (role.selected)
                //             user.roles.add(role.stringId);
                //         else
                //             user.roles.delete(role.stringId);
                //
                //         rolesChanged = true;
                //         user.changedRoles = true;
                //     }
                // });
                //
                // self.users.forEach(user => user.selected = user.roles.has(role.stringId) && role.selected);
                // if (rolesChanged)
                //     $scope.saved = false;
            };

            self.changeUserToRole = function (role, user) {

            };

            self.saveRoles = function () {
                self.users.forEach((user, index) => {
                    if (user.changedRoles) {
                        $http.post(user.$href("assignProcessRole"), JSON.stringify([...user.roles])).then(function (response) {
                            if (response.success) {
                                user.changedRoles = false;
                                $scope.saved = $scope.saved && true;
                                $snackbar.success($i18n.block.snackbar.rolesSuccessfullyAssignedTo + " " + user.fullName);
                            } else {
                                $snackbar.error(response.error);
                                $scope.saved = $scope.saved && false;
                            }
                        }, function () {
                            $snackbar.error($i18n.block.snackbar.assigningRolesToUser + " " + user.fullName + " " + $i18n.block.snackbar.failed);
                            $scope.saved = $scope.saved && false;
                        });
                    }
                });
            };
            self.saveByUser = function (user) {
                $http.post(user.$href("assignProcessRole"), JSON.stringify([...user.roles])).then(response => {
                    if (response.success) {
                        $snackbar.success($i18n.block.snackbar.rolesSuccessfullyAssignedTo + " " + user.fullName);
                    } else {
                        $snackbar.error(response.error);
                    }
                }, () => {
                    $snackbar.error($i18n.block.snackbar.assigningRolesToUser + " " + user.fullName + " " + $i18n.block.snackbar.failed);
                });
            };

            self.saveByRole = function (role, usersStorage) {
                //TODO save user when roles changes
            };

            self.isObjEmpty = function (obj) {
                return jQuery.isEmptyObject(obj);
            };

            self.loadNets = function () {
                $http.get("/res/petrinet/refs").then(function (response) {
                    response.$request().$get("petriNetReferences").then(function (resources) {
                        $scope.processes = resources;
                    }, function () {
                        $log.debug("No nets references was found!");
                    });
                }, function () {
                    $snackbar.error($i18n.block.snackbar.failedToLoadProcesses);
                });
            };

            self.loadNets();
        }]);
});
