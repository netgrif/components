/**
 * Created by martin on 25.2.2017.
 */
define(['angular', 'angularCharts', '../modules/Roles', '../modules/Main'],
    function (angular) {
        angular.module('ngRoles').controller('RolesController',
            ['$log', '$scope', '$timeout', '$http', '$snackbar',
                function ($log, $scope, $timeout, $http, $snackbar) {
                    var self = this;



                    self.checkboxes = [];
                    self.systemCheckboxes = [];
                    self.net = undefined;
                    self.userMail = undefined;
                    self.disButton = true;
                    self.disSystemButton = true;


                    self.loadPetriNets = function () {
                        if (self.petriNetRefs) return;
                        $http.get("/res/petrinet/refs").then(function (response) {
                            $log.debug(response);
                            $log.debug(response.$request());
                            response.$request().$get("petriNetReferences").then(function (resource) {
                                self.petriNetRefs = resource;
                            });
                        }, function () {
                            $log.debug("Petri net refs get failed!");
                        });
                    };

                    self.loadRoles = function (pickedNet) {

                        self.checkboxes = [];
                        self.net = pickedNet;
                        $http.get("/res/petrinet/roles/assign/" + pickedNet).then(function (response) {
                            $log.debug(response);
                            $log.debug(response.$request());
                            self.roles = response.roles;
                            self.users = response.users;

                            for (i = 0; i < self.roles.length; i++)
                                self.checkboxes.push({
                                    value: self.roles[i].name,
                                    ID: self.roles[i].objectId,
                                    isEnabled: false
                                });

                            $log.debug(self.checkboxes);
                            //self.loadRolesForUser(self.userMail);

                        }, function () {
                            $log.debug("Petri net refs get failed!");
                        });
                    };

                    self.loadSystemRoles = function () {

                        self.systemCheckboxes = [];
                        $http.get("/res/systemrole/all").then(function (response) {
                            $log.debug(response);
                            $log.debug(response.$request());
                            self.systemRoles = response.roles;
                            self.systemUsers = response.users;

                            for (i = 0; i < self.systemRoles.length; i++)
                                self.systemCheckboxes.push({
                                    value: self.systemRoles[i].name,
                                    isEnabled: false
                                });

                            $log.debug(self.systemCheckboxes);

                        }, function () {
                            $log.debug("Petri net refs get failed!");
                        });
                    };

                    self.enableSave = function () {
                        self.disButton = false;
                    };
                    self.enableSystemSave = function () {
                        self.disSystemButton = false;
                    };

                    self.loadRolesForUser = function (email) {
                        self.userMail = email;

                        for (j = 0; j < self.roles.length; j++)
                            self.checkboxes[j].isEnabled = false;
                        var userObj = self.users.find(x => x.email === email);
                        $log.debug(userObj);
                        for (i = 0; i < userObj.userProcessRoles.length; i++) {
                            $log.debug(userObj.userProcessRoles[i].roleId);
                            if (userObj.userProcessRoles <= 0)
                                return;
                            var roleInd = self.checkboxes.findIndex(x => x.ID === userObj.userProcessRoles[i].roleId);
                            $log.debug(roleInd);
                            if (roleInd > -1) {
                                self.checkboxes[roleInd].isEnabled = true
                            }
                        }
                        $log.debug(self.checkboxes);
                    };

                    self.loadSystemRolesForUser = function (email) {
                        self.userMail = email;

                        for (j = 0; j < self.systemRoles.length; j++)
                            self.systemCheckboxes[j].isEnabled = false;
                        var userObj = self.systemUsers.find(x => x.email === email);
                        $log.debug(userObj);
                        for (i = 0; i < userObj.roles.length; i++) {
                            $log.debug(userObj.roles[i].name);
                            if (userObj.roles <= 0)
                                return;
                            var roleInd = self.systemCheckboxes.findIndex(x => x.value === userObj.roles[i].name);
                            $log.debug(roleInd);
                            if (roleInd > -1) {
                                self.systemCheckboxes[roleInd].isEnabled = true
                            }
                        }
                        $log.debug(self.systemCheckboxes);
                    };

                    self.saveRole = function () {
                        var postObj = {};
                        var choosenRoles = [];
                        var rolesArray = [];
                        postObj.email = self.userMail;
                        self.checkboxes.forEach(function (role) {
                            $log.debug(role);
                            if (role.isEnabled == true) {
                                choosenRoles.push(role.ID);
                                rolesArray.push({content: [], links: [], roleId: role.ID});
                            }
                        });
                        postObj.roleIds = choosenRoles;
                        $log.debug(postObj);

                        $http.post("/res/petrinet/roles/assign/" + self.net, JSON.stringify(postObj)).then(function (response) {
                            $log.debug(response);

                            self.users.find(x => x.email === self.userMail).userProcessRoles = rolesArray;
                            $log.debug(self.users);
                            var userObj = self.users.find(x => x.email === self.userMail);
                            $snackbar.info("Roles for user " + userObj.name + " " + userObj.surname + " saved.");
                        }, function () {
                            $log.debug("Role was not assigned");
                        });


                    };


                }]);
    });
