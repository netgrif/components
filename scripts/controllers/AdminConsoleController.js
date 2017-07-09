define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').controller('AdminConsoleController', ['$log', '$scope', '$http', '$snackbar', '$timeout', '$user',
    function ($log, $scope, $http, $snackbar, $timeout, $user) {
        const self = this;

        // TODO 9/7/2017 cleanup needed
        self.inviteLoading = false;

        self.users = [];
        self.roles = {
            process: undefined,
            roles: []
        };

        $scope.users = [];
        $scope.roles = [];
        $scope.userSearch = {
            input: "",
            byEmail: true,
            byName: true
        };
        $scope.roleSearch = "";
        $scope.processes = undefined;
        $scope.saved = true;

        self.invite = function () {
            let formData = angular.element("form#admin-invite-form").serialize();
            $log.debug(formData);
            self.inviteLoading = true;
            $http.post('/signup/invite',formData)
                .then(function (response) {
                    // TODO 16/3/2017 add loader animation
                    $snackbar.success("Invite sent");
                    $log.debug(response);
                    self.inviteLoading = false;
                    angular.element("form#admin-invite-form input").val("");
                },function () {
                    $snackbar.error("Invite failed");
                    self.inviteLoading = false;
                });
        };

        self.loadRoles = function () {
            if (!self.roles.process) return;
            $http.get("/res/petrinet/" + self.roles.process.entityId + "/roles").then(function (response) {
                response.$request().$get("processRoles").then(function (resources) {
                    self.roles.roles = resources;
                    self.roles.roles.forEach(role => role.selected = false);
                    $scope.roles = self.roles.roles;

                    self.users.forEach(user => {
                        if(user.selected){
                            user.selected = false;
                            self.selectUser(user);
                        }
                    });
                }, function () {
                    $log.debug("No roles was found!");
                });
            }, function () {
                $snackbar.error("Failed to roles for process " + self.roles.title);
            });
        };

        self.loadUsers = function () {
            $http.get("/res/user/small").then(function (response) {
                response.$request().$get("users").then(function (resources) {
                    self.users = resources;
                    self.users.forEach(user => {
                        user.roles = new Set(user.userProcessRoles.map(role => role.roleId));
                        user.selected = false;
                    });
                    $scope.users = self.users;
                }, function () {
                    $log.debug("No user resource was found!");
                });
            }, function () {
                $snackbar.error("Failed to load users!");
            });
        };

        self.loadNets = function () {
            $http.get("/res/petrinet/refs").then(function (response) {
                response.$request().$get("petriNetReferences").then(function (resources) {
                    $scope.processes = resources;
                }, function () {
                    $log.debug("No nets references was found!");
                });
            }, function () {
                $snackbar.error("Failed to load processes!");
            });
        };

        self.filterUsers = function () {
            if (!self.users) return;
            if (self.users.length === 0) return;
            $scope.userSearch.input = $scope.userSearch.input.trim();
            if (!$scope.userSearch.input || $scope.userSearch.input === "") $scope.users = self.users;
            else $scope.users = self.users.filter(user => {
                let include = false;
                if ($scope.userSearch.byName)
                    include = include || user.fullName.includes($scope.userSearch.input);
                if ($scope.userSearch.byEmail)
                    include = include || user.email.includes($scope.userSearch.input);
                return include;
            });
        };

        self.filterRoles = function () {
            if (!self.roles.roles) return;
            if (self.roles.roles.length === 0) return;
            $scope.roleSearch = $scope.roleSearch.trim();
            if (!$scope.roleSearch || $scope.roleSearch === "") $scope.roles = self.roles.roles;
            else $scope.roles = self.roles.roles.filter(role => role.name.includes($scope.roleSearch));
        };

        self.selectUser = function (user) {
            user.selected = !user.selected;
            let helpUser;
            let intersect = new Set(user.selected ? user.roles :
                ((helpUser = self.users.find(us => us.selected)) ? helpUser.roles : []));
            self.users.forEach(u =>
                intersect = u.selected ? new Set([...intersect].filter(i => u.roles.has(i))) : intersect);
            self.roles.roles.forEach(role => role.selected = intersect.has(role.objectId));
        };

        self.selectRole = function (role) {
            role.selected = !role.selected;
            let rolesChanged = false;
            self.users.forEach(user => {
                if (user.selected) {
                    if (role.selected) user.roles.add(role.objectId);
                    else user.roles.delete(role.objectId);
                    rolesChanged = true;
                    user.changedRoles = true;
                }
            });

            if (!rolesChanged)
                self.users.forEach(user => user.selected = user.roles.has(role.objectId) && role.selected);
            else
                $scope.saved = false;
        };

        self.saveRoles = function () {
            $scope.saved = true;
            self.users.forEach((user, index) => {
                if (user.changedRoles) {
                    $http.post(user.$href("assignProcessRole"), JSON.stringify([...user.roles])).then(function (response) {
                        if (response.success) {
                            user.changedRoles = false;
                            $scope.saved = $scope.saved && true;
                            $snackbar.success("Successfully assigned roles to "+user.fullName);
                        } else {
                            $snackbar.error(response.error);
                            $scope.saved = $scope.saved && false;
                        }
                    }, function () {
                        $snackbar.error("Assigning roles to user " + user.fullName + " has failed!");
                        $scope.saved = $scope.saved && false;
                    });
                }
            });
        };

        self.loadUsers();
        self.loadNets();
    }]);
});
