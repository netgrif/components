/**
 * Created by martin on 25.2.2017.
 */
define(['angular','angularCharts','../modules/Roles','../modules/Main'],
    function (angular) {
        angular.module('ngRoles').controller('RolesController',
            ['$log','$scope','$timeout','$http',
                function ($log, $scope, $timeout, $http) {
                    var self = this;



                    self.checkboxes=[];
                    self.net;
                    self.userMail;

                    self.loadPetriNets = function () {
                        if(self.petriNetRefs) return;
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
                        if(self.roles || self.users) return;
                        self.net=pickedNet;
                        $http.get("/res/petrinet/roles/assign/"+pickedNet).then(function (response) {
                            $log.debug(response);
                            $log.debug(response.$request());
                                self.roles = response.roles;
                                self.users = response.users;

                           for (i=0;i<self.roles.length;i++)
                                self.checkboxes.push({value: self.roles[i].name, ID: self.roles[i].objectId, isEnabled: false});

                            $log.debug(self.checkboxes);

                        }, function () {
                            $log.debug("Petri net refs get failed!");
                        });
                    };

                    self.loadRolesForUser = function (email) {
                        self.userMail=email;
                        for (j=0;j<self.roles.length;j++)
                            self.checkboxes[j].isEnabled=false;
                      var userObj=self.users.find(x => x.email === email);
                        for (i=0;i<userObj.roles.length;i++){
                           // $log.debug(userObj.roles[i].name);
                            if (userObj.userProcessRoles<=0)
                                return;
                          var roleInd=self.checkboxes.findIndex(x => x.ID === userObj.userProcessRoles[i].roleId);
                            $log.debug(roleInd);
                            if(roleInd>-1){self.checkboxes[roleInd].isEnabled=true}
                        }
                        $log.debug(self.checkboxes);
                    };

                    self.saveRole = function () {
                       // if(self.roles || self.users) return;

                       // $http.post(task.$href("data-edit"),JSON.stringify(dataFields)).then(function (response) {
                        //$http.post(url,"userMail="+useMail+"&roleId="+roleId).then();

                        $http.post("/res/petrinet/roles/assign/"+self.net,"usermail="+user+"&roleId="+roleId).then(function (response) {
                            $log.debug(response);

                        }, function () {
                            $log.debug("Role was not assigned");
                        });
                    };



                }]);
    });
