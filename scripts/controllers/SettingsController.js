define(['angular', '../modules/Main'],
    function (angular) {
        angular.module('ngMain').controller('SettingsController',
            ['$http', '$log', '$scope', '$snackbar', '$user', '$i18n', '$rootScope', '$config',
                function ($http, $log, $scope, $snackbar, $user, $i18n, $rootScope, $config) {
                    const self = this;

                    self.changeUserSignUpPolicy = $config.enable.userSignUp;
                    // self.processes = {};

                    self.processes = {
                        "ProcessID_1": {
                            initials: "INC",
                            name: "Test Insurance HHI",
                            roles: [
                                {
                                    roleId: "1",
                                    name: "Role 1"
                                },
                                {
                                    roleId: "2",
                                    name: "Role 2"
                                }
                            ],
                            selected: [
                                {
                                    roleId: "1",
                                    name: "Role 1"
                                }
                            ]
                        },
                        "ProcessID_2": {
                            initials: "ARC",
                            name: "Test Archive",
                            roles: [
                                {
                                    roleId: "3",
                                    name: "Role 3"
                                },
                                {
                                    roleId: "4",
                                    name: "Role 4"
                                },
                                {
                                    roleId: "5",
                                    name: "Role 5"
                                }
                            ],
                            selected: [
                                {
                                    roleId: "3",
                                    name: "Role 3"
                                },
                                {
                                    roleId: "5",
                                    name: "Role 5"
                                }
                            ]
                        }
                    };

                    // self.loadProcesses = function () {
                    //     self.processes = $process.processes.forEach(p => {
                    //         $http.get(`/api/petrinet/${p.id}/roles`).then(response => {
                    //             response.$request().$get('roles').then(resources => {
                    //                 resources.forEach(r => {
                    //                     self.processes[p.id] = p;
                    //                     self.processes[p.id].roles = r;
                    //                     self.processes[p.id].selected = [];
                    //                 })
                    //
                    //             }, () => {
                    //
                    //             })
                    //         }, error => {
                    //
                    //         })
                    //     })
                    // };

                    // self.loadProcesses();
                }
            ]
        );
    });