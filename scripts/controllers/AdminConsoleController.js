define(['angular', '../modules/Admin'], function (angular) {
    angular.module('ngAdmin').controller('AdminConsoleController',
        ['$log', '$scope', '$http', '$snackbar', '$timeout', '$user', '$i18n', '$location', '$auth',
            function ($log, $scope, $http, $snackbar, $timeout, $user, $i18n, $location, $auth) {
                if (!$user.hasAuthority("ROLE_ADMIN"))
                    $location.path("/");

                const self = this;

                //Invitation
                self.inviteLoading = false;
                self.invitedUser = {
                    email: undefined,
                    groups: [],
                    processRoles: {}
                };
                self.groups = [];
                self.processRoles = [];
                self.selectedNet = undefined;

                //Data for users and roles tab
                self.users = [];
                self.processes = [];

                function UserRolesTab(preference) {
                    this.preference = preference;
                    this.filteredUsers = [];
                    this.filteredRoles = [];
                    this.selectedRoles = undefined;
                    this.selectedUser = undefined;
                    this.roles = {
                        process: undefined,
                        roles: []
                    };
                    this.userSearch = {
                        input: "",
                        byEmail: true,
                        byName: true
                    };
                    this.roleSearch = "";
                }

                UserRolesTab.USER_PREFERENCE = "users";
                UserRolesTab.ROLE_PREFERENCE = "roles";

                //Users tab
                self.usersTab = new UserRolesTab(UserRolesTab.USER_PREFERENCE);
                self.rolesTab = new UserRolesTab(UserRolesTab.ROLE_PREFERENCE);

                /**
                 * Load process roles for invite tab.
                 * Before calling this method, this controller must have loaded list of petri nets.
                 * To load list of petri nets use method self.loadNets
                 */
                self.loadProcessRoles = function () {
                    if (!self.selectedNet) return;
                    self.processRoles = [];
                    $http.get("/api/petrinet/" + self.selectedNet.stringId + "/roles").then(function (response) {
                        response.$request().$get("processRoles").then(function (resources) {
                            self.processRoles = resources;
                            self.processRoles.forEach(role => {
                                role.add = function () {
                                    if (self.invitedUser.processRoles[self.selectedNet.stringId]) {
                                        if (!self.invitedUser.processRoles[self.selectedNet.stringId].roles.includes(this))
                                            self.invitedUser.processRoles[self.selectedNet.stringId].roles.push(this);
                                    } else {
                                        self.invitedUser.processRoles[self.selectedNet.stringId] = {roles: []};
                                        Object.assign(self.invitedUser.processRoles[self.selectedNet.stringId], self.selectedNet);
                                        self.invitedUser.processRoles[self.selectedNet.stringId].roles.push(this);
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
                 * Load list of groups for invite tab
                 */
                self.loadOrganizations = function () {
                    $http.get("/api/group/all").then(function (response) {
                        response.$request().$get("groups").then(function (resources) {
                            self.groups = resources;
                            self.groups.forEach(org => {
                                org.add = function () {
                                    if (!self.invitedUser.groups.includes(this))
                                        self.invitedUser.groups.push(this);
                                };
                                org.remove = function () {
                                    const i = self.invitedUser.groups.indexOf(this);
                                    if (i !== -1)
                                        self.invitedUser.groups.splice(i, 1);
                                };
                            });
                        }, function () {
                            $log.debug("No resource for groups was found!");
                        });
                    }, function () {
                        $snackbar.error($i18n.block.snackbar.noOrganizationFound);
                    });
                };

                /**
                 * Send invitation request
                 */
                self.invite = function () {
                    if (!self.invitedUser.email || self.invitedUser.email.trim() === "") {
                        $snackbar.error($i18n.block.snackbar.emailFieldIsMandatory);
                        return;
                    }
                    if (self.invitedUser.groups.length === 0) {
                        $snackbar.error($i18n.block.snackbar.newUserMustBelongToOneOrMoreOrganization);
                        return;
                    }
                    if (jQuery.isEmptyObject(self.invitedUser.processRoles)) {
                        $snackbar.error($i18n.block.snackbar.newUserMustHasAssignedOneOrMoreRoles);
                        return;
                    }

                    const invitation = {
                        email: self.invitedUser.email,
                        groups: self.invitedUser.groups.map(org => org.id),
                        processRoles: jQuery.map(self.invitedUser.processRoles, (val, i) => val.roles.map(role => role.stringId))
                    };

                    self.inviteLoading = true;
                    $auth.invite(invitation, (success, message) => {
                        if(success){
                            $snackbar.success($i18n.block.snackbar.inviteSent);
                            self.invitedUser.email = undefined;
                            self.invitedUser.groups.splice(0, self.invitedUser.groups.length);
                            self.invitedUser.processRoles = {};
                        } else {
                            $snackbar.error($i18n.block.snackbar.inviteFailed);
                        }
                        self.inviteLoading = false;
                    });
                };

                /* Roles and Users tab */
                /**
                 * Load list of process roles of selected process
                 */
                UserRolesTab.prototype.loadRoles = function () {
                    if (!this.roles.process)
                        return;
                    this.roles.roles.splice(0, this.roles.roles);
                    this.filteredRoles.splice(0, this.filteredRoles.length);
                    $http.get("/api/petrinet/" + this.roles.process.stringId + "/roles").then(response => {
                        response.$request().$get("processRoles").then(resources => {
                            this.roles.roles = resources;
                            this.roles.roles.forEach(role => {
                                role.selected = false;
                                if (this.preference === UserRolesTab.ROLE_PREFERENCE) {
                                    role.users = new Set(self.users.filter(user => user.roles.has(role.stringId)));
                                }
                            });
                            if (this.selectedUser) {
                                const user = this.selectedUser;
                                this.selectedUser = undefined;
                                this.selectUser(user);
                            }
                            this.filteredRoles = this.roles.roles;

                        }, () => {
                            $log.debug("No roles was found!");
                        });
                    }, () => {
                        $snackbar.error($i18n.block.snackbar.failedToLoadRolesForProcess + " " + self.roles.title);
                    });
                };

                /**
                 * Load list of all active users in the system
                 */
                UserRolesTab.prototype.loadUsers = function () {
                    if (self.users.length > 0) {
                        this.filteredUsers = self.users;
                        self.users.forEach(user => user.selected = false);
                        return;
                    }
                    $http.get("/api/user?small=true").then(response => {
                        response.$request().$get("users").then(resources => {
                            self.users = resources;
                            self.users.forEach(user => {
                                user.roles = new Set(user.userProcessRoles.map(role => role.roleId));
                                user.selected = false;
                                user.changed = false;
                            });
                            this.filteredUsers = self.users;
                        }, () => {
                            $log.debug("No user resource was found!");
                        });
                    }, () => {
                        $snackbar.error($i18n.block.snackbar.failedToLoadUsers);
                    });
                };

                /**
                 * Search among loaded users
                 * @returns {Array}
                 */
                UserRolesTab.prototype.filterUsers = function () {
                    if (!self.users || self.users.length === 0)
                        return null;
                    this.userSearch.input = this.userSearch.input.trim();
                    if (!this.userSearch.input || this.userSearch.input === "")
                        this.filteredUsers = self.users;
                    else {
                        this.filteredUsers = self.users.filter(user => {
                            let include = false;
                            if (this.userSearch.byName)
                                include = include || user.fullName.includes(this.userSearch.input);
                            if (this.userSearch.byEmail)
                                include = include || user.email.includes(this.userSearch.input);
                            return include;
                        });
                    }
                    return this.filteredUsers;
                };

                /**
                 * Search among loaded process roles
                 * @returns {Array}
                 */
                UserRolesTab.prototype.filterRoles = function () {
                    if (!this.roles.roles || this.roles.roles === 0)
                        return null;
                    this.roleSearch = this.roleSearch.trim();
                    if (!this.roleSearch || this.roleSearch === "")
                        this.filteredRoles = this.roles.roles;
                    else
                        this.filteredRoles = this.roles.roles.filter(role => role.name.includes(this.roleSearch));
                    return this.filteredRoles;
                };

                /**
                 * Toggle selected state on user and highlight all roles from search results that user has
                 * @param user clicked user
                 */
                UserRolesTab.prototype.selectUser = function (user) {
                    let selectedEmail = "";
                    if (this.selectedUser) {
                        selectedEmail = this.selectedUser.email;
                        this.selectedUser.selected = false;
                        this.selectedUser = undefined;
                        this.roles.roles.forEach(role => role.selected = false);
                    }
                    if (user && user.email !== selectedEmail) {
                        user.selected = true;
                        this.selectedUser = user;
                        this.roles.roles.forEach(role => role.selected = user.roles.has(role.stringId));
                    }
                };

                /**
                 * Add or remove clicked role to selected user.
                 * Role is removed when is already assigned to user otherwise is new roles add to the role set
                 * @param role Clicked role
                 * @param after Name of the function that runs after successful operation
                 */
                UserRolesTab.prototype.changeRoleToUser = function (role, after = "") {
                    if (!this.selectedUser || !role)
                        return;
                    if (this.selectedUser.roles.has(role.stringId)) {
                        role.selected = false;
                        this.selectedUser.roles.delete(role.stringId);
                    } else {
                        role.selected = true;
                        this.selectedUser.roles.add(role.stringId);
                    }

                    this[after].call(this, this.selectedUser);
                };

                /**
                 * Toggle selected state on role and highlight all users that has selected role
                 * @param role clicked role
                 */
                UserRolesTab.prototype.selectRole = function (role) {
                    let roleId = "";
                    if (this.selectedRole) {
                        roleId = this.selectedRole.stringId;
                        this.selectedRole.selected = false;
                        if (this.preference === UserRolesTab.ROLE_PREFERENCE)
                            this.selectedRole.users.forEach(user => user.selected = false);
                        else
                            self.users.forEach(user => user.selected = false);
                        this.selectedRole = undefined;
                    }
                    if (role && role.stringId !== roleId) {
                        role.selected = true;
                        this.selectedRole = role;
                        if (this.preference === UserRolesTab.ROLE_PREFERENCE)
                            this.selectedRole.users.forEach(user => user.selected = true);
                        else
                            self.users.forEach(user => user.selected = user.roles.has(role.stringId));
                    }
                };

                /**
                 * Add or remove clicked user to selected role
                 * User is removed when selected role is already assigned to clicked user, otherwise selected role is assign to clicked user
                 * @param user clicked user
                 * @param after name of the function that runs after this operation
                 */
                UserRolesTab.prototype.changeUserToRole = function (user, after = "") {
                    if (!this.selectedRole || !user)
                        return;
                    if (this.selectedRole.users.has(user)) {
                        user.selected = false;
                        user.changed = true;
                        user.roles.delete(this.selectedRole.stringId);
                        this.selectedRole.users.delete(user);
                    } else {
                        user.selected = true;
                        user.changed = true;
                        user.roles.add(this.selectedRole.stringId);
                        this.selectedRole.users.add(user);
                    }

                    this[after].call(this, this.selectedRole);
                };

                UserRolesTab.prototype.saveByUser = function (user, callback = angular.noop) {
                    if (!user)
                        return;
                    const self = this;
                    $http.post(user.$href("assignProcessRole"), JSON.stringify([...user.roles])).then(response => {
                        if (response.success) {
                            $snackbar.success($i18n.block.snackbar.rolesSuccessfullyAssignedTo + " " + user.fullName);
                            self.reloadUser(user);
                            callback(true);
                        } else {
                            $snackbar.error(response.error);
                            callback(false);
                        }
                    }, () => {
                        $snackbar.error($i18n.block.snackbar.assigningRolesToUser + " " + user.fullName + " " + $i18n.block.snackbar.failed);
                        callback(false);
                    });
                };

                UserRolesTab.prototype.saveByRole = function (role) {
                    self.users.filter(u => u.changed).forEach(user =>
                        self.rolesTab.saveByUser(user, success => {
                            if (success)
                                user.changed = false;
                        })
                    );
                };

                UserRolesTab.prototype.reloadUser = function (user) {
                    if (user.email !== $user.login)
                        return;

                    $user.clear();
                    $http.get("/api/user/me?small=true").then(response => {
                        $user.fromResource(response);
                    }, error => {
                        $log.error("Failed to reload user's data!");
                        $log.error(error);
                    });
                };

                /* General stuff */
                self.isObjEmpty = function (obj) {
                    return jQuery.isEmptyObject(obj);
                };

                self.loadNets = function () {
                    $http.get("/api/petrinet").then(function (response) {
                        response.$request().$get("petriNetReferences").then(function (resources) {
                            self.processes = resources;
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
