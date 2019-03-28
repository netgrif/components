define(['angular', '../modules/Admin'], function (angular) {
    angular.module('ngAdmin').controller('AdminConsoleController',
        ['$log', '$scope', '$http', '$snackbar', '$timeout', '$user', '$i18n', '$location', '$auth', '$config', '$process',
            function ($log, $scope, $http, $snackbar, $timeout, $user, $i18n, $location, $auth, $config, $process) {
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
                self.page = {
                    pageLinks: {}
                };
                self.loading = false;
                self.searchInput = undefined;
                self.searchLast = undefined;
                self.selectedTab = undefined;
                self.counter = 0;

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

                function buildRole(role) {
                    role.add = function () {
                        if (self.invitedUser.processRoles[self.selectedNet.stringId]) {
                            if (!self.invitedUser.processRoles[self.selectedNet.stringId].roles.find(r => r.name === this.name))
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
                    return role;
                }

                /**
                 * Load process roles for invite tab.
                 * Before calling this method, this controller must have loaded list of petri nets.
                 * To load list of petri nets use method self.loadNets
                 */
                self.loadProcessRoles = function () {
                    if (!self.selectedNet) return;
                    self.processRoles = [];
                    $http.get($config.getApiUrl({
                        url: "/petrinet/{net}/roles",
                        params: {net: self.selectedNet.stringId}
                    })).then(function (response) {
                        response.$request().$get("processRoles").then(function (resources) {
                            self.processRoles = resources;
                            self.processRoles.sort((r1, r2) => {
                                return r1.name > r2.name;
                            });
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

                self.applyDefaultProcessRoles = function () {
                    if (!$config.defaults.invitedUser.processRoles || $config.defaults.invitedUser.processRoles.length === 0)
                        return;

                    $config.defaults.invitedUser.processRoles.forEach(defaults => {
                        if (!defaults.roles || defaults.roles.length === 0)
                            return;
                        const net = $process.get(defaults.net);
                        if (net) {
                            defaults.roles.forEach(dRole => {
                                const role = net.role(dRole);
                                if (role) {
                                    role.stringId = role.id;
                                    buildRole(role);
                                    if (self.invitedUser.processRoles[net.id]) {
                                        if (!self.invitedUser.processRoles[net.id].roles.find(r => r.name === role.name))
                                            self.invitedUser.processRoles[net.id].roles.push(role);
                                    } else {
                                        self.invitedUser.processRoles[net.id] = {};
                                        Object.assign(self.invitedUser.processRoles[net.id], net);
                                        self.invitedUser.processRoles[net.id].roles = [];
                                        self.invitedUser.processRoles[net.id].transitions = [];
                                        self.invitedUser.processRoles[net.id].roles.push(role);
                                    }
                                } else
                                    $log.warn("Process role " + dRole + " in process " + net + " was not found!");
                            });
                        } else
                            $log.warn("Net " + defaults.net + " was not found!");
                    });
                };

                function applyDefaultGroups() {
                    if (!$config.defaults.invitedUser.groups || $config.defaults.invitedUser.groups.length === 0)
                        return;

                    $config.defaults.invitedUser.groups.forEach(dGroup => {
                        const group = self.groups.find(group => group.name === dGroup);
                        if (group)
                            group.add();
                        else
                            $log.warn("Group " + dGroup + " was not found!");
                    });
                }

                /**
                 * Load list of groups for invite tab
                 */
                self.loadOrganizations = function () {
                    $http.get($config.getApiUrl("/group/all")).then(function (response) {
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
                            applyDefaultGroups();
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
                    if (!$config.enable.inviteUserWithNoProcessRoles && jQuery.isEmptyObject(self.invitedUser.processRoles)) {
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
                        if (success) {
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
                    $http.get($config.getApiUrl({
                        url: "/petrinet/{net}/roles",
                        params: {
                            net: this.roles.process.stringId
                        }
                    })).then(response => {
                        response.$request().$get("processRoles").then(resources => {
                            this.roles.roles = resources;
                            this.sortRoles();
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

                UserRolesTab.prototype.sortRoles = function () {
                    this.roles.roles = this.roles.roles.sort((r1, r2) => {
                        if (r1.name > r2.name)
                            return 1;
                        if (r1.name < r2.name)
                            return -1;
                        return 0;
                    });

                };

                UserRolesTab.prototype.clearAll = function () {
                    this.filteredUsers = [];
                    this.filteredRoles = [];
                    this.selectedRoles = undefined;
                    this.selectedUser = undefined;
                    this.roles = {
                        process: undefined,
                        roles: []
                    };
                    if (!self.loading) {
                        this.userSearch = {
                            input: "",
                            byEmail: true,
                            byName: true
                        };
                        this.roleSearch = "";
                    }
                };

                /**
                 * Load list of all active users in the system
                 */
                UserRolesTab.prototype.loadUsers = function (next) {
                    if (self.loading) return;
                    if (next && !self.page.pageLinks.next) return;

                    self.loading = true;
                    let request = self.buildRequest(next ? self.page.pageLinks.next.href : undefined);
                    $http(request).then(response => {
                        if (!next)
                            self.clearAll();
                        self.page = Object.assign(self.page, response.page);
                        self.page.pageLinks = response.$response().data._links;
                        response.$request().$get("users").then(resources => {
                            resources.forEach(user => {
                                user.roles = new Set(user.userProcessRoles.map(role => role.roleId));
                                user.selected = false;
                                user.changed = false;
                            });
                            self.users = self.users.concat(resources);
                            this.sortUsers();
                            this.filteredUsers = self.users;
                            self.loading = false;
                        }, () => {
                            $log.debug("No user resource was found!");
                            self.loading = false;
                        });
                    }, () => {
                        $snackbar.error($i18n.block.snackbar.failedToLoadUsers);
                    });
                };

                UserRolesTab.prototype.sortUsers = function () {
                    self.users = self.users.sort((u1, u2) => {
                        if (u1.surname > u2.surname)
                            return 1;
                        if (u1.surname < u2.surname)
                            return -1;
                        return 0;
                    });
                };

                self.buildRequest = function (next) {
                    return {
                        method: 'POST',
                        url: next ? next : $config.getApiUrl("/user/search"),
                        params: {
                            small: true
                        },
                        data: self.buildSearchQuery()
                    }
                };

                self.buildSearchQuery = function () {
                    return {
                        fulltext: !self.searchLast ? "" : self.searchLast
                    }
                };

                self.clearAll = function () {
                    self.page = {
                        pageLinks: {}
                    };
                    self.users = [];
                    self.selectedNet = undefined;
                    if (!self.loading) {
                        self.searchLast = undefined;
                    }
                    self.usersTab.clearAll();
                    self.rolesTab.clearAll();
                };

                /**
                 * Search among loaded users
                 * @returns {Array}
                 */
                UserRolesTab.prototype.filterUsers = function () {
                    self.counter += 1;
                    $timeout(() => {
                        self.counter -= 1;
                        if (self.counter !== 0) {
                            return;
                        }

                        this.userSearch.input = this.userSearch.input.trim();
                        self.searchLast = this.userSearch.input;
                        this.loadUsers(false);
                    }, 500);
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
                        this.filteredRoles = this.roles.roles.filter(
                            role => role.name.toLowerCase().includes(this.roleSearch.toLowerCase())
                        );
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
                    $http({
                        method: "GET",
                        url: $config.getApiUrl("/user/me"),
                        params: {
                            small: true
                        }
                    }).then(response => {
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
                    $http.get($config.getApiUrl("/petrinet")).then(function (response) {
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
            }
        ]
    );
});
